package com.shadow.tracker.repository

import com.shadow.tracker.entity.Streak
import org.springframework.data.jpa.repository.JpaRepository

interface StreakRepository : JpaRepository<Streak, Int>
