package com.shadow.tracker.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "chat_messages")
class ChatMessage(
    @Column(nullable = false)
    var role: String,              // "user" oder "assistant"

    @Column(columnDefinition = "text", nullable = false)
    var content: String,

    var createdAt: Instant = Instant.now()
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
