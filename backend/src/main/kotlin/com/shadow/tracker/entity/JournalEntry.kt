package com.shadow.tracker.entity

import jakarta.persistence.*
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "journal_entries")
class JournalEntry(
    var title: String? = null,

    @Column(columnDefinition = "text")
    var body: String? = null,

    // Feste Fragen (optional pro Eintrag)
    @Column(columnDefinition = "text")
    var wentWell: String? = null,      // Was lief gut?
    @Column(columnDefinition = "text")
    var blocked: String? = null,       // Was blockierte?
    @Column(columnDefinition = "text")
    var tomorrow: String? = null,      // Morgen anders?

    var entryDate: LocalDate = LocalDate.now(),
    var createdAt: Instant = Instant.now()
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}
