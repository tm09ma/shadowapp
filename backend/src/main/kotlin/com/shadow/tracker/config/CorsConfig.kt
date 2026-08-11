package com.shadow.tracker.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

// ============================================================
// CorsConfig  —  CONFIG
// Erlaubt dem Frontend (andere URL) das Backend zu rufen.
// Ohne das blockiert der Browser die Anfragen.
// Nur die eine erlaubte Frontend-Origin (Umgebungsvariable
// FRONTEND_ORIGIN) darf zugreifen, nicht "*".
// ============================================================

@Configuration
class CorsConfig(
    @Value("\${app.frontend-origin}") private val frontendOrigin: String
) : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/api/**")
            .allowedOrigins(frontendOrigin)
            .allowedMethods("GET", "POST", "PATCH", "DELETE", "OPTIONS")
            .allowedHeaders("X-Auth-Token", "Content-Type")
    }
}
