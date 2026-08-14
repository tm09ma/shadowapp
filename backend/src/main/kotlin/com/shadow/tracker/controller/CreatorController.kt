package com.shadow.tracker.controller

import com.shadow.tracker.dto.CreatorDto
import com.shadow.tracker.entity.Creator
import com.shadow.tracker.service.CreatorService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/creators")
class CreatorController(private val service: CreatorService) {

    @GetMapping
    fun getAll(@RequestParam(required = false) stage: String?): List<Creator> =
        if (stage != null) service.getByStage(stage) else service.getAll()

    @PostMapping
    fun create(@RequestBody dto: CreatorDto): Creator = service.create(dto)

    @PostMapping("/batch")
    fun createBatch(@RequestBody dtos: List<CreatorDto>): List<Creator> = service.createBatch(dtos)

    @GetMapping("/vault")
    fun getVault(): List<Creator> = service.getVault()

    @PostMapping("/pull-daily")
    fun pullDaily(): List<Creator> = service.pullDailyLeads()

    @GetMapping("/rejected")
    fun getRejected(): List<Creator> = service.getRejected()

    @PostMapping("/auto-reject")
    fun autoReject(): Map<String, Int> = mapOf("rejected" to service.autoReject())

    @PatchMapping("/{id}/stage")
    fun updateStage(@PathVariable id: Long, @RequestParam stage: String): Creator =
        service.updateStage(id, stage)

    @PatchMapping("/{id}/dm-sent")
    fun markDmSent(@PathVariable id: Long, @RequestParam version: String, @RequestBody body: Map<String, String>): Creator =
        service.markDmSent(id, version, body["text"] ?: "")

    @PostMapping("/dm-sent-batch")
    fun markDmSentBatch(@RequestBody ids: List<Long>): List<Creator> = service.markDmSentBatch(ids)

    @PatchMapping("/{id}/replied")
    fun markReplied(@PathVariable id: Long): Creator = service.markReplied(id)

    @PatchMapping("/{id}/exchange")
    fun addExchange(@PathVariable id: Long): Creator = service.addExchange(id)

    @PatchMapping("/{id}/follow-up")
    fun markFollowUp(@PathVariable id: Long, @RequestParam number: Int): Creator =
        service.markFollowUp(id, number)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = service.delete(id)

    // TEMPORARY — one-time cleanup of test data, remove after use
    @DeleteMapping("/delete-all")
    fun deleteAll(): Map<String, Int> = mapOf("deleted" to service.deleteAll())
}
