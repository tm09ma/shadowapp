package com.shadow.tracker.service

import com.anthropic.client.AnthropicClient
import com.anthropic.models.messages.MessageCreateParams
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import com.shadow.tracker.dto.DmRequest
import com.shadow.tracker.dto.DmResponse
import com.shadow.tracker.dto.DmVersion
import com.shadow.tracker.repository.CreatorRepository
import com.shadow.tracker.repository.JournalRepository
import org.springframework.stereotype.Service

// ============================================================
// DmGeneratorService
// 5 Versionen. Ab 105 gesendeten Erst-DMs zusaetzlich eine
// "Personal DM" aus geglueckten First-DMs (Nische/Modell) +
// Journal-Erkenntnissen.
// ============================================================

@Service
class DmGeneratorService(
    private val anthropicClient: AnthropicClient,
    private val creatorRepository: CreatorRepository,
    private val journalRepository: JournalRepository
) {
    private val mapper = ObjectMapper().registerKotlinModule()
    private val PERSONAL_THRESHOLD = 105

    private val baseRules = """
        You write Instagram DMs to creators to start genuine conversations.
        Goal: earn a reply and build rapport. Never sell, never pitch, never mention money.

        ABSOLUTE RULES:
        - English only
        - NO special characters, NO emojis, NO em dashes. Only ? and !
        - NO pitch, money, revenue, business talk
        - Sound human and curious, never analytical or AI-like
        - Reference something REAL and specific, not a generic niche label
        - Each DM ends with ONE open-ended question
        - Opener: "Hey [Name], I've been seeing your content lately..." then genuine
          appreciation, then a specific observation, then an open question
        - Match the creator's energy for length
    """.trimIndent()

    fun generate(request: DmRequest): DmResponse {
        // Zaehle gesendete ERST-DMs (nur dmSentAt gesetzt)
        val sentFirstDms = creatorRepository.findAll().count { it.dmSentAt != null }
        val includePersonal = sentFirstDms >= PERSONAL_THRESHOLD

        val system = buildString {
            append(baseRules)
            append("\n\nProduce 5 versions:\n")
            append("V1 Journal (introspective), V2 Positionierung (validates positioning), ")
            append("V3 Ursprung (origin story), V4 Problemfokus (visible tension, strongest), ")
            append("V5 Beobachtungen (layered observation).\n")
            append("For each: status \"ready\" if it fully follows the rules and is specific, ")
            append("else \"review\" with a short tip.\n")
            append("Recommend ONE version for THIS creator with a brief reason.\n")

            if (includePersonal) {
                // Personal DM aus geglueckten First-DMs (Nische + Version), plus Journal
                val winners = creatorRepository.findAll()
                    .filter { it.replied && it.dmSentText != null }
                val sameNiche = winners.filter { it.niche.equals(request.niche, ignoreCase = true) }
                val pool = (if (sameNiche.size >= 3) sameNiche else winners).take(15)

                val examples = pool.joinToString("\n---\n") { c ->
                    "Niche: ${c.niche} | Version: ${c.dmVersion ?: "?"}\n${c.dmSentText}"
                }
                val journalNotes = journalRepository.findAll()
                    .takeLast(10)
                    .joinToString("\n") { listOfNotNull(it.title, it.body, it.wentWell).joinToString(" ") }
                    .take(1500)

                append("\n\nADDITIONALLY produce a 6th version with id \"personal\", label \"Personal DM\".\n")
                append("Build it by learning from these DMs that actually GOT REPLIES ")
                append("(prefer patterns from the same niche), and from the user's journal insights. ")
                append("Explain in its tip WHY you built it this way (e.g. which pattern worked).\n")
                append("\nDMs that got replies:\n$examples\n")
                if (journalNotes.isNotBlank()) append("\nJournal insights:\n$journalNotes\n")
            }

            append("\nRespond ONLY with valid JSON, no markdown:\n")
            append("""{"versions":[{"id":"V1","label":"Journal","text":"...","status":"ready","tip":null}], "recommended":"V4","reason":"..."}""")
            if (includePersonal) append("\nInclude the \"personal\" item in the versions array.")
        }

        val userText = buildString {
            append("Creator handle: ${request.handle}\n")
            append("Niche: ${request.niche ?: "unknown"}\n")
            append("Followers: ${request.followers ?: "unknown"}\n")
            if (!request.textContext.isNullOrBlank())
                append("\nContext / direction from user:\n${request.textContext}\n")
            append("\nWrite the DMs now.")
        }

        val params = MessageCreateParams.builder()
            .model("claude-opus-4-8")
            .maxTokens(2500)
            .system(system)
            .addUserMessage(userText)
            .build()

        val message = anthropicClient.messages().create(params)
        val raw = message.content()
            .mapNotNull { it.text().orElse(null)?.text() }
            .joinToString("")
            .replace("```json", "").replace("```", "").trim()

        return mapper.readValue(raw, DmResponse::class.java)
    }
}
