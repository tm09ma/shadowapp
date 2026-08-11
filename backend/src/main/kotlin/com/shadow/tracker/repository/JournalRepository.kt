package com.shadow.tracker.repository

import com.shadow.tracker.entity.JournalEntry
import org.springframework.data.jpa.repository.JpaRepository

interface JournalRepository : JpaRepository<JournalEntry, Long>
