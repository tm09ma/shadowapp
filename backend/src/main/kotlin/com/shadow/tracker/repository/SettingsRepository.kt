package com.shadow.tracker.repository

import com.shadow.tracker.entity.Settings
import org.springframework.data.jpa.repository.JpaRepository

interface SettingsRepository : JpaRepository<Settings, Int>
