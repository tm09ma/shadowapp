package com.shadow.tracker.controller

import com.shadow.tracker.entity.Settings
import com.shadow.tracker.service.SettingsService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/settings")
class SettingsController(private val service: SettingsService) {

    @GetMapping
    fun get(): Settings = service.get()

    @PatchMapping
    fun update(@RequestBody patch: Settings): Settings = service.update(patch)
}
