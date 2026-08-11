package com.shadow.tracker.entity

import jakarta.persistence.*

// Ein Ziel der Daily Challenge. Entweder vordefiniert (type gesetzt)
// oder selbst geschrieben (custom text).
@Entity
@Table(name = "daily_goals")
class DailyGoal(
    // "dms", "engagement", "followups", "journal" oder "custom"
    @Column(nullable = false)
    var type: String,

    var label: String,              // Anzeigetext
    var autoTracked: Boolean = false, // App zaehlt selbst (dms, followups, journal)
    var sortOrder: Int = 0
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
