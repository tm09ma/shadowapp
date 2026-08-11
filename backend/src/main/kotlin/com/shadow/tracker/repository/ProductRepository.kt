package com.shadow.tracker.repository

import com.shadow.tracker.entity.Product
import org.springframework.data.jpa.repository.JpaRepository

interface ProductRepository : JpaRepository<Product, Long> {
    fun findByCreatorId(creatorId: Long): List<Product>
}
