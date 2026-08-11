package com.shadow.tracker.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "calls")
class Call(
    @Column(nullable = false)
    var creatorId: Long,

    @Column(nullable = false)
    var callNumber: Int,           // 1 oder 2

    var label: String? = null,     // frei benennbar, z.B. "Kennenlernen"
    var scheduledAt: Instant? = null,
    var completed: Boolean = false,

    @Column(columnDefinition = "text")
    var notes: String? = null,     // Notizen pro Call

    var createdAt: Instant = Instant.now()
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
