package com.shadow.tracker.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "products")
class Product(
    @Column(nullable = false)
    var creatorId: Long,

    var name: String? = null,
    var type: String? = null,

    // development, test, launch (nur der Reihe nach)
    @Column(nullable = false)
    var stage: String = "development",

    // Ganze Phase als abgeschlossen markiert (wenn keine Unterpunkte)
    var devDone: Boolean = false,
    var testDone: Boolean = false,
    var launchDone: Boolean = false,

    @Column(columnDefinition = "text")
    var problemNotes: String? = null,

    // Revenue nur ab launch sichtbar (von Whop)
    var whopProductId: String? = null,
    var revenue: Double = 0.0,
    var customers: Int = 0,
    var isLive: Boolean = false,

    var createdAt: Instant = Instant.now()
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
