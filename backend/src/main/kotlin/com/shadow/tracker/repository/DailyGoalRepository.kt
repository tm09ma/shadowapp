package com.shadow.tracker.repository

import com.shadow.tracker.entity.DailyGoal
import org.springframework.data.jpa.repository.JpaRepository

interface DailyGoalRepository : JpaRepository<DailyGoal, Long>
