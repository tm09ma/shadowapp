package com.shadow.tracker.service

import com.shadow.tracker.entity.Call
import com.shadow.tracker.entity.Product
import com.shadow.tracker.repository.CallRepository
import com.shadow.tracker.repository.CreatorRepository
import com.shadow.tracker.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class CallService(
    private val callRepository: CallRepository,
    private val creatorRepository: CreatorRepository,
    private val productRepository: ProductRepository
) {
    fun getAll(): List<Call> = callRepository.findAll()
    fun getForCreator(creatorId: Long): List<Call> = callRepository.findByCreatorId(creatorId)

    // Call planen/anlegen (frei benennbar, mit Termin)
    fun schedule(call: Call): Call {
        // Creator auf call_booked setzen
        creatorRepository.findById(call.creatorId).ifPresent {
            it.stage = "call_booked"
            creatorRepository.save(it)
        }
        return callRepository.save(call)
    }

    // Notizen / Abschluss aktualisieren
    fun update(id: Long, notes: String?, completed: Boolean?): Call {
        val c = callRepository.findById(id).orElseThrow { NoSuchElementException("Call $id nicht gefunden") }
        if (notes != null) c.notes = notes
        if (completed != null) c.completed = completed
        return callRepository.save(c)
    }

    // Won -> Produktname -> Product anlegen (ab Call 1 moeglich)
    fun markWon(creatorId: Long, productName: String?): Product {
        creatorRepository.findById(creatorId).ifPresent {
            it.stage = "won"
            creatorRepository.save(it)
        }
        val product = Product(creatorId = creatorId, name = productName, stage = "development")
        return productRepository.save(product)
    }

    fun markLost(creatorId: Long) {
        creatorRepository.findById(creatorId).ifPresent {
            it.stage = "lost"
            creatorRepository.save(it)
        }
    }
}
