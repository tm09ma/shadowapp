package com.shadow.tracker.controller

import com.shadow.tracker.entity.JournalEntry
import com.shadow.tracker.service.JournalService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/journal")
class JournalController(private val service: JournalService) {

    @GetMapping
    fun getAll(): List<JournalEntry> = service.getAll()

    @PostMapping
    fun create(@RequestBody entry: JournalEntry): JournalEntry = service.create(entry)
}
