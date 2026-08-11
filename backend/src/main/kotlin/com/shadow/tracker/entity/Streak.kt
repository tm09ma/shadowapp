package com.shadow.tracker.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "streak")
class Streak(
    @Id
    var id: Int = 1,
    var current: Int = 0,
    var longest: Int = 0,
    var lastCompletedDay: LocalDate? = null
)
