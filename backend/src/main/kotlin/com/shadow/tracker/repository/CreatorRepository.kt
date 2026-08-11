package com.shadow.tracker.repository

import com.shadow.tracker.entity.Creator
import org.springframework.data.jpa.repository.JpaRepository

// ============================================================
// CreatorRepository  —  REPOSITORY (Schicht 3)
// Wir erben von JpaRepository und bekommen GESCHENKT:
//   save(), findById(), findAll(), deleteById(), count() ...
// Zusaetzlich definieren wir eigene Abfragen einfach per Methodenname.
// Spring baut die SQL dahinter automatisch.
// ============================================================

interface CreatorRepository : JpaRepository<Creator, Long> {

    // "finde alle Creator mit dieser Stage" -> Spring baut das SQL selbst
    fun findByStage(stage: String): List<Creator>

    fun findByStageIn(stages: List<String>): List<Creator>

    // --- Vault ---
    // Alle Creator die noch im Vorrat liegen
    fun findByInVaultTrue(): List<Creator>

    // Zaehle wie viele noch im Vault sind
    fun countByInVaultTrue(): Long
}
