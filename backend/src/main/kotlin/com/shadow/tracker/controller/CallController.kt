package com.shadow.tracker.controller

import com.shadow.tracker.entity.Call
import com.shadow.tracker.entity.Product
import com.shadow.tracker.service.CallService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/calls")
class CallController(private val service: CallService) {

    @GetMapping
    fun getAll(): List<Call> = service.getAll()

    @GetMapping("/creator/{creatorId}")
    fun forCreator(@PathVariable creatorId: Long): List<Call> = service.getForCreator(creatorId)

    @PostMapping
    fun schedule(@RequestBody call: Call): Call = service.schedule(call)

    @PatchMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody body: Map<String, Any?>): Call =
        service.update(id, body["notes"] as? String, body["completed"] as? Boolean)

    @PostMapping("/won/{creatorId}")
    fun markWon(@PathVariable creatorId: Long, @RequestParam(required = false) productName: String?): Product =
        service.markWon(creatorId, productName)

    @PostMapping("/lost/{creatorId}")
    fun markLost(@PathVariable creatorId: Long) = service.markLost(creatorId)
}
