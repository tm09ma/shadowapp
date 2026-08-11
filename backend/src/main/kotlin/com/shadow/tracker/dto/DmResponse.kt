package com.shadow.tracker.dto

// ============================================================
// DmResponse  —  DTO (raus)
// Die Form der Antwort: 5 Versionen + Empfehlung + Begruendung.
// ============================================================

data class DmVersion(
    val id: String,          // "V1".."V5"
    val label: String,       // "Journal", "Problemfokus" ...
    val text: String,        // die DM selbst
    val status: String,      // "ready" oder "review"
    val tip: String? = null  // Hinweis wenn "review"
)

data class DmResponse(
    val versions: List<DmVersion>,
    val recommended: String,   // z.B. "V4"
    val reason: String         // warum diese Version fuer diesen Creator
)
