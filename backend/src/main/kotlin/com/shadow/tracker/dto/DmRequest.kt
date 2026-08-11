package com.shadow.tracker.dto

// ============================================================
// DmRequest  —  DTO (rein)
// Die Form der Anfrage die vom Frontend kommt, wenn es
// 5 DMs generieren will.
// ============================================================

data class DmRequest(
    val handle: String,
    val niche: String? = null,
    val followers: Int? = null,
    val textContext: String? = null,       // Bio + Captions
    val screenshots: List<String> = emptyList()  // Base64-Bilder
)
