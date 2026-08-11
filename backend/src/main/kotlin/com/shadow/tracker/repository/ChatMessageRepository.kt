package com.shadow.tracker.repository

import com.shadow.tracker.entity.ChatMessage
import org.springframework.data.jpa.repository.JpaRepository

interface ChatMessageRepository : JpaRepository<ChatMessage, Long> {
    // die letzten Nachrichten, neueste zuerst
    fun findTop20ByOrderByCreatedAtDesc(): List<ChatMessage>
}
