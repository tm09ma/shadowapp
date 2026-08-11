package com.shadow.tracker.controller

import com.shadow.tracker.entity.ChecklistItem
import com.shadow.tracker.entity.Product
import com.shadow.tracker.service.ProductService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/products")
class ProductController(private val service: ProductService) {

    @GetMapping
    fun getAll(): List<Product> = service.getAll()

    @PatchMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody patch: Product): Product = service.update(id, patch)

    @PostMapping("/{id}/advance")
    fun advance(@PathVariable id: Long): Product = service.advancePhase(id)

    @PatchMapping("/{id}/phase-done")
    fun phaseDone(@PathVariable id: Long, @RequestParam phase: String, @RequestParam done: Boolean): Product =
        service.markPhaseDone(id, phase, done)

    @GetMapping("/{id}/checklist")
    fun checklist(@PathVariable id: Long): List<ChecklistItem> = service.getChecklist(id)

    @PostMapping("/{id}/checklist")
    fun addItem(@PathVariable id: Long, @RequestParam phase: String, @RequestBody body: Map<String, String>): ChecklistItem =
        service.addChecklistItem(id, phase, body["text"] ?: "")

    @PatchMapping("/checklist/{itemId}/toggle")
    fun toggleItem(@PathVariable itemId: Long): ChecklistItem = service.toggleChecklistItem(itemId)

    @DeleteMapping("/checklist/{itemId}")
    fun deleteItem(@PathVariable itemId: Long) = service.deleteChecklistItem(itemId)
}
