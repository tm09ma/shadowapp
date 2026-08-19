package com.shadow.tracker.service

import com.anthropic.client.AnthropicClient
import com.anthropic.models.messages.Base64ImageSource
import com.anthropic.models.messages.ContentBlockParam
import com.anthropic.models.messages.ImageBlockParam
import com.anthropic.models.messages.MessageCreateParams
import com.anthropic.models.messages.TextBlockParam
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
        - Match the creator's energy for length

        SCREENSHOT USAGE:
        You will receive screenshots of the creator's Instagram profile (bio, recent posts).
        Extract: their niche, content style, and 3-5 recent post topics. Use this to
        understand who they are — but do NOT describe what you see literally in the DM.

        CONTEXT FIELD:
        If the user provides a "context" note, treat it as ONE small detail to naturally
        weave into ONE part of the DM — never as the entire theme or subject of the
        message. The DM must still feel varied and draw from the creator's overall
        content, not fixate only on the context note. If context is empty, build entirely
        from the screenshots/bio.

        QUESTION STYLE (the most important rule):
        NEVER use an interview structure like "I noticed you do X, so I'm wondering Y" or
        "I've been watching your content and it made me think about Z." This sounds cold
        and like an interview.

        Instead: you may casually mention ONE specific thing you liked or noticed, woven
        naturally into a sentence, not as a setup for the question. Then ask a question
        about their ACCOUNT or JOURNEY as a whole, not a single isolated fact. Good
        questions ask about evolution, decisions, or the bigger picture, e.g. "was this
        always your approach or did it develop over time", not "why did you decide to do
        X in that one video."

        BAD EXAMPLE: "I've been seeing your videos for a while now and noticed you show
        your full process. Was it hard for you in the beginning to make that decision?"
        GOOD EXAMPLE: "What made you decide to show the full process instead of skipping
        straight to the result?" — but even better when it asks about the account's
        evolution: "Were you always this detailed about showing your process or did that
        develop as your account grew?"

        Aim for the second style: genuinely curious about their journey or account as a
        whole, phrased like a real question a person would naturally ask, not like a
        scripted interview opener.

        QUALITY BAR:
        All 5 versions must be strong enough that choosing between them is genuinely
        difficult. Do not make some versions deliberately weaker placeholders — every
        version should follow the improved question style above and be ready to send.
    """.trimIndent()

    // Erkennt den Bild-Typ anhand der Magic Bytes im Base64-String,
    // damit Anthropic den Base64-Block korrekt dekodieren kann
    // (Handy-Screenshots sind meistens PNG, nicht JPEG).
    private fun detectMediaType(base64: String): Base64ImageSource.MediaType = when {
        base64.startsWith("iVBORw0KGgo") -> Base64ImageSource.MediaType.IMAGE_PNG
        base64.startsWith("/9j/") -> Base64ImageSource.MediaType.IMAGE_JPEG
        base64.startsWith("R0lGOD") -> Base64ImageSource.MediaType.IMAGE_GIF
        base64.startsWith("UklGR") -> Base64ImageSource.MediaType.IMAGE_WEBP
        else -> Base64ImageSource.MediaType.IMAGE_JPEG
    }

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

        val contentBlocks = buildList {
            request.screenshots.forEach { base64 ->
                add(
                    ContentBlockParam.ofImage(
                        ImageBlockParam.builder()
                            .source(
                                Base64ImageSource.builder()
                                    .data(base64)
                                    .mediaType(detectMediaType(base64))
                                    .build()
                            )
                            .build()
                    )
                )
            }
            add(ContentBlockParam.ofText(TextBlockParam.builder().text(userText).build()))
        }

        val params = MessageCreateParams.builder()
            .model("claude-opus-4-8")
            .maxTokens(2500)
            .system(system)
            .addUserMessageOfBlockParams(contentBlocks)
            .build()

        val message = anthropicClient.messages().create(params)
        val raw = message.content()
            .mapNotNull { it.text().orElse(null)?.text() }
            .joinToString("")
            .replace("```json", "").replace("```", "").trim()

        return mapper.readValue(raw, DmResponse::class.java)
    }
}
