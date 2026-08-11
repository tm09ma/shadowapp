package com.shadow.tracker.repository

import com.shadow.tracker.entity.DailyProgress
import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDate

interface DailyProgressRepository : JpaRepository<DailyProgress, Long> {
    fun findByDay(day: LocalDate): DailyProgress?
}
