package com.shadow.tracker.repository

import com.shadow.tracker.entity.Call
import org.springframework.data.jpa.repository.JpaRepository

interface CallRepository : JpaRepository<Call, Long> {
    fun findByCreatorId(creatorId: Long): List<Call>
}
