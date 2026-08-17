package com.shadow.tracker.service

import com.anthropic.client.AnthropicClient
import com.anthropic.models.messages.MessageCreateParams
import com.shadow.tracker.entity.ChatMessage
import com.shadow.tracker.repository.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import org.springframework.stereotype.Service

// ============================================================
// SupportChatService - der Mentor
// Sieht ALLES (Pipeline, DMs, Calls, Produkte, Journal).
// 105-Schwelle. Verlauf: letzte 20. Tagesnachricht.
// ============================================================

@Service
class SupportChatService(
    private val anthropicClient: AnthropicClient,
    private val creatorRepository: CreatorRepository,
    private val callRepository: CallRepository,
    private val productRepository: ProductRepository,
    private val journalRepository: JournalRepository,
    private val chatRepo: ChatMessageRepository
) {
    private val DATA_THRESHOLD = 105

    // Baut den vollen Kontext ueber die ganze App
    private fun buildContext(): String {
        val creators = creatorRepository.findAll()
        val sentFirst = creators.count { it.dmSentAt != null }
        val stages = creators.groupingBy { it.stage }.eachCount()
        val replies = creators.count { it.replied }
        val replyRate = if (sentFirst > 0) replies * 100 / sentFirst else 0
        val calls = callRepository.findAll()
        val products = productRepository.findAll()
        val journalRecent = journalRepository.findAll().takeLast(5)
            .joinToString(" | ") { listOfNotNull(it.title, it.wentWell, it.blocked).joinToString(" ") }
            .take(1000)

        return buildString {
            append("LIVE DATA:\n")
            append("Pipeline by stage: $stages\n")
            append("First DMs sent: $sentFirst, replies: $replies, reply rate: $replyRate%\n")
            append("Calls: ${calls.size}, Products: ${products.size}\n")
            append("Vault (reserve creators): ${creators.count { it.inVault }}\n")
            if (journalRecent.isNotBlank()) append("Recent journal: $journalRecent\n")
        }
    }

    private fun modeInstruction(sentFirst: Int): String =
        if (sentFirst < DATA_THRESHOLD)
            "MODE EARLY PHASE ($sentFirst/$DATA_THRESHOLD DMs). No statistical tips like 'V4 is best'. " +
            "Coach with principles, strategy, motivation, overview. If asked which version is best, " +
            "say it is too early and we need more volume first."
        else
            "MODE DATA PHASE ($sentFirst DMs). Niche-specific but experimental advice. Never 'only use one version'. " +
            "Lead the process: suggest, let user test, define next step."

    private fun systemPrompt(): String {
        val sentFirst = creatorRepository.findAll().count { it.dmSentAt != null }
        return """
            You are the user's business partner and mentor inside their outreach app (Shadow Operating business).
            You always have the full overview and think strategically, like a sharp partner who wants them to win.
            Direct, warm, practical. English. Not a stats robot, not a replacement for human connection.

            ${modeInstruction(sentFirst)}

            ${buildContext()}
        """.trimIndent()
    }

    // Baut die MessageCreateParams (Modell, System-Prompt, Verlauf) fuer einen Chat-Call
    private fun buildMessageParams(history: List<ChatMessage>): MessageCreateParams {
        val builder = MessageCreateParams.builder()
            .model("claude-opus-4-8")
            .maxTokens(1000)
            .system(systemPrompt())
        history.forEach {
            if (it.role == "user") builder.addUserMessage(it.content)
            else builder.addAssistantMessage(it.content)
        }
        return builder.build()
    }

    fun chat(userMessage: String): String {
        // User-Nachricht speichern
        chatRepo.save(ChatMessage(role = "user", content = userMessage))

        // letzte 20 als Verlauf
        val history = chatRepo.findTop20ByOrderByCreatedAtDesc().reversed()
        val params = buildMessageParams(history)

        val message = anthropicClient.messages().create(params)
        val reply = message.content()
            .mapNotNull { it.text().orElse(null)?.text() }
            .joinToString("")

        chatRepo.save(ChatMessage(role = "assistant", content = reply))
        return reply
    }

    // Streamt die Antwort Wort-fuer-Wort als Flow<String> (fuer SSE im Controller).
    // Der Anthropic-Client liefert dazu einen blockierenden java.util.stream.Stream von
    // RawMessageStreamEvent - wir picken nur die reinen Text-Deltas raus und emitten sie.
    fun chatStream(userMessage: String): Flow<String> {
        chatRepo.save(ChatMessage(role = "user", content = userMessage))
        val history = chatRepo.findTop20ByOrderByCreatedAtDesc().reversed()
        val params = buildMessageParams(history)

        return flow {
            val fullResponse = StringBuilder()
            anthropicClient.messages().createStreaming(params).use { stream ->
                for (event in stream.stream()) {
                    val chunk = event.contentBlockDelta().orElse(null)
                        ?.delta()?.text()?.orElse(null)?.text()
                    if (chunk != null) {
                        fullResponse.append(chunk)
                        emit(chunk)
                    }
                }
            }
            chatRepo.save(ChatMessage(role = "assistant", content = fullResponse.toString()))
        }.flowOn(Dispatchers.IO)
    }

    fun getHistory(): List<ChatMessage> =
        chatRepo.findTop20ByOrderByCreatedAtDesc().reversed()

    // Tagesnachricht: Mentor gibt proaktiv Tagesueberblick
    fun dailyBriefing(): String {
        val builder = MessageCreateParams.builder()
            .model("claude-opus-4-8")
            .maxTokens(600)
            .system(systemPrompt())
            .addUserMessage(
                "Give me my morning briefing: what is on the plate today and what we want to improve and how. " +
                "Everything important, short and to the point."
            )
        val message = anthropicClient.messages().create(builder.build())
        val reply = message.content()
            .mapNotNull { it.text().orElse(null)?.text() }
            .joinToString("")
        chatRepo.save(ChatMessage(role = "assistant", content = reply))
        return reply
    }
}
