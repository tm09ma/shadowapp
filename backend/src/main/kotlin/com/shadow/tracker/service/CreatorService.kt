package com.shadow.tracker.service

import com.shadow.tracker.dto.CreatorDto
import com.shadow.tracker.entity.Creator
import com.shadow.tracker.repository.CreatorRepository
import com.shadow.tracker.repository.SettingsRepository
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.temporal.ChronoUnit

@Service
class CreatorService(
    private val creatorRepository: CreatorRepository,
    private val settingsRepository: SettingsRepository
) {
    fun getAll(): List<Creator> = creatorRepository.findAll()
    fun getByStage(stage: String): List<Creator> = creatorRepository.findByStage(stage)

    private fun normalizeHandle(h: String) = if (h.startsWith("@")) h else "@$h"

    fun create(dto: CreatorDto): Creator {
        val c = Creator(
            handle = normalizeHandle(dto.handle),
            niche = dto.niche ?: "Unknown",
            followers = dto.followers ?: 0,
            stage = "engage",
            inVault = true
        )
        return creatorRepository.save(c)
    }

    fun createBatch(dtos: List<CreatorDto>): List<Creator> {
        val list = dtos.map {
            Creator(
                handle = normalizeHandle(it.handle),
                niche = it.niche ?: "Unknown",
                followers = it.followers ?: 0,
                stage = "engage",
                inVault = true
            )
        }
        return creatorRepository.saveAll(list)
    }

    // --- VAULT ---
    fun getVault(): List<Creator> = creatorRepository.findByInVaultTrue()

    fun pullDailyLeads(): List<Creator> {
        val settings = settingsRepository.findById(1).orElse(null)
        val count = (settings?.leadsPerDay ?: 15).coerceIn(15, 20)
        val fromVault = creatorRepository.findByInVaultTrue().take(count)
        fromVault.forEach {
            it.inVault = false
            it.stage = "engage"
            it.addedAt = Instant.now()
        }
        return creatorRepository.saveAll(fromVault)
    }

    fun delete(id: Long) = creatorRepository.deleteById(id)

    // TEMPORARY — one-time cleanup of test data, remove after use
    fun deleteAll(): Int {
        val count = creatorRepository.findAll().size
        creatorRepository.deleteAll()
        return count
    }

    // --- STAGE / DM ---
    fun updateStage(id: Long, stage: String): Creator {
        val c = get(id)
        c.stage = stage
        return creatorRepository.save(c)
    }

    fun markDmSent(id: Long, version: String, text: String): Creator {
        val c = get(id)
        c.stage = "dm_sent"
        c.dmVersion = version
        c.dmSentText = text
        c.dmSentAt = Instant.now()
        c.lastExchangeAt = Instant.now()
        return creatorRepository.save(c)
    }

    // mehrere gleichzeitig als gesendet markieren
    fun markDmSentBatch(ids: List<Long>): List<Creator> {
        val creators = creatorRepository.findAllById(ids)
        val now = Instant.now()
        creators.forEach {
            it.stage = "dm_sent"
            if (it.dmSentAt == null) it.dmSentAt = now
            it.lastExchangeAt = now
        }
        return creatorRepository.saveAll(creators)
    }

    // Reply markieren -> wandert in Active Conversations (stage replied)
    fun markReplied(id: Long): Creator {
        val c = get(id)
        c.replied = true
        c.repliedAt = Instant.now()
        c.stage = "replied"
        c.lastExchangeAt = Instant.now()
        c.exchangeCount = c.exchangeCount + 1
        return creatorRepository.save(c)
    }

    // +1 Exchange Button (setzt Rejected-Timer + Heat zurueck)
    fun addExchange(id: Long): Creator {
        val c = get(id)
        c.exchangeCount = c.exchangeCount + 1
        c.lastExchangeAt = Instant.now()
        return creatorRepository.save(c)
    }

    // Follow-up gesendet (1, 2 oder 3)
    fun markFollowUp(id: Long, number: Int): Creator {
        val c = get(id)
        val now = Instant.now()
        when (number) {
            1 -> c.fu1SentAt = now
            2 -> c.fu2SentAt = now
            3 -> c.fu3SentAt = now
        }
        c.lastExchangeAt = now
        return creatorRepository.save(c)
    }

    // Rejected-Liste
    fun getRejected(): List<Creator> = creatorRepository.findByStage("rejected")

    // Automatik: Creator ohne Exchange seit X Tagen -> rejected
    fun autoReject(): Int {
        val settings = settingsRepository.findById(1).orElse(null)
        val days = settings?.rejectAfterDays ?: 7
        val cutoff = Instant.now().minus(days.toLong(), ChronoUnit.DAYS)
        val active = creatorRepository.findByStage("replied")
        val toReject = active.filter { it.lastExchangeAt != null && it.lastExchangeAt!!.isBefore(cutoff) }
        toReject.forEach { it.stage = "rejected" }
        creatorRepository.saveAll(toReject)
        return toReject.size
    }

    private fun get(id: Long): Creator =
        creatorRepository.findById(id).orElseThrow { NoSuchElementException("Creator $id nicht gefunden") }
}
