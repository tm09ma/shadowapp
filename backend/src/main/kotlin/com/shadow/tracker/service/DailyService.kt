package com.shadow.tracker.service

import com.shadow.tracker.entity.*
import com.shadow.tracker.repository.*
import org.springframework.stereotype.Service
import java.time.LocalDate

// ============================================================
// DailyService - Daily Challenge: Ziele, Fortschritt, Streak
// ============================================================

@Service
class DailyService(
    private val goalRepo: DailyGoalRepository,
    private val progressRepo: DailyProgressRepository,
    private val streakRepo: StreakRepository,
    private val creatorRepository: CreatorRepository,
    private val settingsRepository: SettingsRepository,
    private val journalService: JournalService
) {
    // --- Ziele verwalten ---
    fun getGoals(): List<DailyGoal> = goalRepo.findAll().sortedBy { it.sortOrder }

    fun addGoal(goal: DailyGoal): DailyGoal = goalRepo.save(goal)
    fun deleteGoal(id: Long) = goalRepo.deleteById(id)

    // --- Tagesfortschritt ---
    fun getToday(): DailyProgress =
        progressRepo.findByDay(LocalDate.now()) ?: progressRepo.save(DailyProgress())

    private fun streak(): Streak =
        streakRepo.findById(1).orElseGet { streakRepo.save(Streak()) }

    // Wie viele DMs heute gesendet (auto)
    private fun dmsSentToday(): Int {
        val today = LocalDate.now()
        return creatorRepository.findAll().count {
            it.dmSentAt != null && it.dmSentAt!!.atZone(java.time.ZoneId.systemDefault()).toLocalDate() == today
        }
    }

    // Zusammenfassung fuer das Dashboard: welche Ziele erfuellt sind
    fun status(): Map<String, Any> {
        val goals = getGoals()
        val progress = getToday()
        val checkedIds = progress.checkedGoalIds.split(",").filter { it.isNotBlank() }.toSet()
        val settings = settingsRepository.findById(1).orElse(null)
        val leadsPerDay = (settings?.leadsPerDay ?: 15)

        val goalStates = goals.map { g ->
            val done = when (g.type) {
                "dms" -> dmsSentToday() >= leadsPerDay
                "journal" -> journalService.hasEntryToday()
                else -> checkedIds.contains(g.id.toString())  // manuell
            }
            mapOf(
                "id" to g.id,
                "type" to g.type,
                "label" to g.label,
                "autoTracked" to (g.type == "dms" || g.type == "journal"),
                "done" to done
            )
        }
        val allDone = goalStates.isNotEmpty() && goalStates.all { it["done"] == true }

        return mapOf(
            "goals" to goalStates,
            "dmsSentToday" to dmsSentToday(),
            "dmsGoal" to leadsPerDay,
            "challengeCompleted" to progress.challengeCompleted,
            "allDone" to allDone,
            "streak" to streak().current
        )
    }

    // Manuelles Ziel abhaken/entaken
    fun toggleGoal(goalId: Long) {
        val p = getToday()
        val ids = p.checkedGoalIds.split(",").filter { it.isNotBlank() }.toMutableSet()
        val key = goalId.toString()
        if (ids.contains(key)) ids.remove(key) else ids.add(key)
        p.checkedGoalIds = ids.joinToString(",")
        progressRepo.save(p)
    }

    // Challenge abschliessen -> Streak +1, bleibt bis Mitternacht
    fun completeChallenge(): Streak {
        val p = getToday()
        p.challengeCompleted = true
        progressRepo.save(p)

        val s = streak()
        val today = LocalDate.now()
        val yesterday = today.minusDays(1)
        s.current = when (s.lastCompletedDay) {
            today -> s.current            // schon heute gezaehlt
            yesterday -> s.current + 1
            else -> 1
        }
        s.longest = maxOf(s.longest, s.current)
        s.lastCompletedDay = today
        return streakRepo.save(s)
    }
}
