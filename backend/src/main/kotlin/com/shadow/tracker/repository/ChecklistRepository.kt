package com.shadow.tracker.repository

import com.shadow.tracker.entity.ChecklistItem
import org.springframework.data.jpa.repository.JpaRepository

interface ChecklistRepository : JpaRepository<ChecklistItem, Long> {
    fun findByProductId(productId: Long): List<ChecklistItem>
    fun findByProductIdAndPhase(productId: Long, phase: String): List<ChecklistItem>
}
