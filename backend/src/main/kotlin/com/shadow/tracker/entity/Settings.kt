package com.shadow.tracker.entity

import jakarta.persistence.*

@Entity
@Table(name = "settings")
class Settings(
    @Id
    var id: Int = 1,

    // Follow-up Timing (drei Stufen, in Tagen)
    var fuFirstDays: Int = 1,
    var fuSecondDays: Int = 2,
    var fuThirdEnabled: Boolean = false,
    var fuThirdDays: Int = 3,

    // Leads per Day (15-20)
    var leadsPerDay: Int = 15,

    // Nach wie vielen Tagen ohne Exchange -> Rejected
    var rejectAfterDays: Int = 7,

    // Whop (optional)
    var whopApiKey: String? = null,

    // Oberflaeche
    var darkMode: Boolean = true,
    var language: String = "de"     // "de" oder "en"
)
