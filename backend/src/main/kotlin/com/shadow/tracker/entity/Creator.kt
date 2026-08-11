package com.shadow.tracker.entity

import jakarta.persistence.*
import java.time.Instant

// ============================================================
// Creator.kt  —  ENTITY
// Pipeline-Stufen: engage, dm_ready, dm_sent, replied,
//                  call_booked, won, lost, rejected
// ============================================================

@Entity
@Table(name = "creators")
class Creator(

    @Column(nullable = false)
    var handle: String,

    @Column(nullable = false)
    var niche: String = "Unknown",

    var followers: Int = 0,

    @Column(nullable = false)
    var stage: String = "engage",

    // --- Vault ---
    @Column(nullable = false)
    var inVault: Boolean = true,

    // --- DM-Daten (Erst-DM) ---
    var dmVersion: String? = null,        // V1..V5 oder "personal"
    @Column(columnDefinition = "text")
    var dmSentText: String? = null,
    var dmSentAt: Instant? = null,

    // --- Reply-Tracking (vom User markiert) ---
    var replied: Boolean = false,
    var repliedAt: Instant? = null,

    // --- Follow-ups (drei Stufen) ---
    var fu1SentAt: Instant? = null,
    var fu2SentAt: Instant? = null,
    var fu3SentAt: Instant? = null,

    // --- Gespraech / Active Conversation ---
    var exchangeCount: Int = 0,           // +1 Button erhoeht das
    var lastExchangeAt: Instant? = null,  // Heat Index UND Rejected-Timer

    // --- Zeitstempel ---
    var addedAt: Instant = Instant.now()  // Tag-Zaehler in Engagement
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
