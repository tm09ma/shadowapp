package com.shadow.tracker.service

import com.shadow.tracker.entity.Creator
import com.shadow.tracker.repository.CreatorRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.temporal.ChronoUnit

// ============================================================
// DashboardService - KPIs
// Pipeline: immer total. Won + Reply-Rate: Zeitraum waehlbar.
// ============================================================

@Service
class DashboardService(
    private val creatorRepository: CreatorRepository
) {
    // period: "week", "month", "total"
    fun kpis(period: String): Map<String, Any> {
        val all = creatorRepository.findAll()
        val cutoff = when (period) {
            "week" -> Instant.now().minus(7, ChronoUnit.DAYS)
            "month" -> Instant.now().minus(30, ChronoUnit.DAYS)
            else -> Instant.EPOCH
        }

        // Pipeline = ALLE einzigartigen Creator "im System"
        // (Vault + Engagement + aktiv), also alles ausser won/lost/rejected
        val pipeline = all.count { it.stage !in listOf("won", "lost", "rejected") }

        // Won im Zeitraum
        val won = all.count { it.stage == "won" }  // won hat keinen eigenen Zeitstempel -> total
        // (Zeitraum bei Won: naeherungsweise ueber lastExchangeAt)
        val wonPeriod = if (period == "total") won
            else all.count { it.stage == "won" && (it.lastExchangeAt?.isAfter(cutoff) ?: false) }

        // Reply-Rate: nur First-DM. Replies / gesendete Erst-DMs im Zeitraum
        val sentDms = all.filter {
            it.dmSentAt != null && (period == "total" || it.dmSentAt!!.isAfter(cutoff))
        }
        val replies = sentDms.count { it.replied }
        val replyRate = if (sentDms.isNotEmpty()) (replies * 100 / sentDms.size) else 0

        return mapOf(
            "sales" to 0,                 // Whop-Platzhalter
            "pipeline" to pipeline,       // immer total
            "won" to wonPeriod,
            "replyRate" to replyRate,
            "period" to period
        )
    }
}
