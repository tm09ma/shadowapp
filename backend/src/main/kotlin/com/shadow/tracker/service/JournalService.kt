package com.shadow.tracker.service

import com.shadow.tracker.entity.JournalEntry
import com.shadow.tracker.repository.JournalRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class JournalService(
    private val journalRepository: JournalRepository
) {
    fun getAll(): List<JournalEntry> =
        journalRepository.findAll().sortedByDescending { it.createdAt }

    fun create(entry: JournalEntry): JournalEntry = journalRepository.save(entry)

    // Gibt es heute schon einen Eintrag? (fuer Daily-Challenge Auto-Haekchen)
    fun hasEntryToday(): Boolean =
        journalRepository.findAll().any { it.entryDate == LocalDate.now() }
}
