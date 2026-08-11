package com.shadow.tracker.entity

import jakarta.persistence.*

// Ein frei erstellter Checklist-Punkt, gehoert zu einem Produkt und einer Phase.
@Entity
@Table(name = "checklist_items")
class ChecklistItem(
    @Column(nullable = false)
    var productId: Long,

    @Column(nullable = false)
    var phase: String,             // development, test, launch

    @Column(nullable = false)
    var text: String,

    var done: Boolean = false
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
