package com.shadow.tracker.dto

// ============================================================
// CreatorDto  —  DTO
// Was das Frontend schickt, um einen Creator anzulegen.
// Bewusst schlanker als die Entity (kein id, keine Zeitstempel).
// ============================================================

data class CreatorDto(
    val handle: String,
    val niche: String? = null,
    val followers: Int? = null,
    val stage: String? = null
)
