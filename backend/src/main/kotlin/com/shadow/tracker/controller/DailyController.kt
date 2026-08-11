package com.shadow.tracker.controller

import com.shadow.tracker.entity.DailyGoal
import com.shadow.tracker.entity.Streak
import com.shadow.tracker.service.DailyService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/daily")
class DailyController(private val service: DailyService) {

    @GetMapping("/status")
    fun status(): Map<String, Any> = service.status()

    @GetMapping("/goals")
    fun goals(): List<DailyGoal> = service.getGoals()

    @PostMapping("/goals")
    fun addGoal(@RequestBody goal: DailyGoal): DailyGoal = service.addGoal(goal)

    @DeleteMapping("/goals/{id}")
    fun deleteGoal(@PathVariable id: Long) = service.deleteGoal(id)

    @PostMapping("/goals/{id}/toggle")
    fun toggleGoal(@PathVariable id: Long) = service.toggleGoal(id)

    @PostMapping("/complete")
    fun complete(): Streak = service.completeChallenge()
}
