package com.shadow.tracker.controller

import com.shadow.tracker.service.DashboardService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/dashboard")
class DashboardController(private val service: DashboardService) {

    @GetMapping
    fun kpis(@RequestParam(defaultValue = "total") period: String): Map<String, Any> =
        service.kpis(period)
}
