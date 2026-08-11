package com.shadow.tracker.service

import com.shadow.tracker.entity.ChecklistItem
import com.shadow.tracker.entity.Product
import com.shadow.tracker.repository.ChecklistRepository
import com.shadow.tracker.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val checklistRepository: ChecklistRepository
) {
    private val phaseOrder = listOf("development", "test", "launch")

    fun getAll(): List<Product> = productRepository.findAll()

    fun getChecklist(productId: Long): List<ChecklistItem> =
        checklistRepository.findByProductId(productId)

    fun update(id: Long, patch: Product): Product {
        val p = productRepository.findById(id).orElseThrow { NoSuchElementException("Product $id nicht gefunden") }
        p.name = patch.name ?: p.name
        p.type = patch.type ?: p.type
        p.problemNotes = patch.problemNotes ?: p.problemNotes
        return productRepository.save(p)
    }

    // Phase wechseln - nur der Reihe nach (dev -> test -> launch)
    fun advancePhase(id: Long): Product {
        val p = productRepository.findById(id).orElseThrow { NoSuchElementException("Product $id nicht gefunden") }
        val idx = phaseOrder.indexOf(p.stage)
        if (idx < phaseOrder.size - 1) {
            p.stage = phaseOrder[idx + 1]
            if (p.stage == "launch") p.isLive = true   // Revenue ab launch
        }
        return productRepository.save(p)
    }

    // Ganze Phase als abgeschlossen markieren
    fun markPhaseDone(id: Long, phase: String, done: Boolean): Product {
        val p = productRepository.findById(id).orElseThrow { NoSuchElementException("Product $id nicht gefunden") }
        when (phase) {
            "development" -> p.devDone = done
            "test" -> p.testDone = done
            "launch" -> p.launchDone = done
        }
        return productRepository.save(p)
    }

    // --- Checklist-Punkte (frei) ---
    fun addChecklistItem(productId: Long, phase: String, text: String): ChecklistItem =
        checklistRepository.save(ChecklistItem(productId = productId, phase = phase, text = text))

    fun toggleChecklistItem(itemId: Long): ChecklistItem {
        val item = checklistRepository.findById(itemId).orElseThrow { NoSuchElementException("Item $itemId nicht gefunden") }
        item.done = !item.done
        return checklistRepository.save(item)
    }

    fun deleteChecklistItem(itemId: Long) = checklistRepository.deleteById(itemId)
}
