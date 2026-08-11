package com.shadow.tracker.service

import com.shadow.tracker.dto.CreatorDto
import com.shadow.tracker.entity.Creator
import com.shadow.tracker.entity.Settings
import com.shadow.tracker.repository.CreatorRepository
import com.shadow.tracker.repository.SettingsRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.util.Optional

// ============================================================
// Testet die CreatorService-Logik isoliert (Repositories gemockt).
// ============================================================

class CreatorServiceTest {

    private val creatorRepo: CreatorRepository = mock()
    private val settingsRepo: SettingsRepository = mock()
    private val service = CreatorService(creatorRepo, settingsRepo)

    @Test
    fun `create fuegt fehlendes @ hinzu und legt in Vault`() {
        val dto = CreatorDto(handle = "yosef", niche = "Tech")
        whenever(creatorRepo.save(any())).thenAnswer { it.arguments[0] }

        val result = service.create(dto)

        assertThat(result.handle).isEqualTo("@yosef")
        assertThat(result.inVault).isTrue()   // neu = im Vault
    }

    @Test
    fun `pullDailyLeads zieht genau die eingestellte Anzahl`() {
        // given: Settings sagt 17 pro Tag
        whenever(settingsRepo.findById(1)).thenReturn(Optional.of(Settings(leadsPerDay = 17)))
        // und 30 Creator liegen im Vault
        val vault = (1..30).map { Creator(handle = "@c$it") }
        whenever(creatorRepo.findByInVaultTrue()).thenReturn(vault)
        whenever(creatorRepo.saveAll(any<List<Creator>>())).thenAnswer { it.arguments[0] }

        // when
        val pulled = service.pullDailyLeads()

        // then: genau 17 gezogen, alle raus aus dem Vault
        assertThat(pulled).hasSize(17)
        assertThat(pulled).allMatch { !it.inVault }
        assertThat(pulled).allMatch { it.stage == "engage" }
    }

    @Test
    fun `pullDailyLeads begrenzt auf maximal 20`() {
        // given: jemand stellt (ungueltig) 50 ein
        whenever(settingsRepo.findById(1)).thenReturn(Optional.of(Settings(leadsPerDay = 50)))
        val vault = (1..30).map { Creator(handle = "@c$it") }
        whenever(creatorRepo.findByInVaultTrue()).thenReturn(vault)
        whenever(creatorRepo.saveAll(any<List<Creator>>())).thenAnswer { it.arguments[0] }

        val pulled = service.pullDailyLeads()

        // then: auf 20 begrenzt
        assertThat(pulled).hasSize(20)
    }

    @Test
    fun `pullDailyLeads begrenzt auf mindestens 15`() {
        // given: jemand stellt (ungueltig) 5 ein
        whenever(settingsRepo.findById(1)).thenReturn(Optional.of(Settings(leadsPerDay = 5)))
        val vault = (1..30).map { Creator(handle = "@c$it") }
        whenever(creatorRepo.findByInVaultTrue()).thenReturn(vault)
        whenever(creatorRepo.saveAll(any<List<Creator>>())).thenAnswer { it.arguments[0] }

        val pulled = service.pullDailyLeads()

        // then: mindestens 15
        assertThat(pulled).hasSize(15)
    }
}
