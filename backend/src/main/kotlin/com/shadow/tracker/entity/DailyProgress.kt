package com.shadow.tracker.entity

import jakarta.persistence.*
import java.time.LocalDate

// Fortschritt eines Tages. Ein Datensatz pro Tag.
@Entity
@Table(name = "daily_progress")
class DailyProgress(
    @Column(nullable = false, unique = true)
    var day: LocalDate = LocalDate.now(),

    // manuell abgehakte Ziel-IDs als kommaseparierte Liste
    @Column(columnDefinition = "text")
    var checkedGoalIds: String = "",

    var challengeCompleted: Boolean = false
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
