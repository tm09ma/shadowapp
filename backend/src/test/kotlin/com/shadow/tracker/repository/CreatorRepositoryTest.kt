package com.shadow.tracker.repository

import com.shadow.tracker.entity.Creator
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

// ============================================================
// Testet das CreatorRepository gegen eine echte (in-memory) DB.
// @DataJpaTest startet nur die DB-Schicht, schnell und isoliert.
// ============================================================

@DataJpaTest
class CreatorRepositoryTest @Autowired constructor(
    val creatorRepository: CreatorRepository
) {
    @Test
    fun `speichert und findet Creator nach Stage`() {
        // given: zwei Creator in verschiedenen Stages
        creatorRepository.save(Creator(handle = "@a", niche = "Tech", stage = "engage"))
        creatorRepository.save(Creator(handle = "@b", niche = "Fitness", stage = "dm_ready"))

        // when: wir suchen nach stage "engage"
        val result = creatorRepository.findByStage("engage")

        // then: genau einer, und zwar @a
        assertThat(result).hasSize(1)
        assertThat(result[0].handle).isEqualTo("@a")
    }

    @Test
    fun `speichert Creator mit automatischer ID`() {
        val saved = creatorRepository.save(Creator(handle = "@test", niche = "Food"))
        assertThat(saved.id).isNotNull()
        assertThat(saved.handle).isEqualTo("@test")
    }
}
