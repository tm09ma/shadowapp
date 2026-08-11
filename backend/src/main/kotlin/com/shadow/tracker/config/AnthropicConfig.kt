package com.shadow.tracker.config

import com.anthropic.client.AnthropicClient
import com.anthropic.client.okhttp.AnthropicOkHttpClient
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

// ============================================================
// AnthropicConfig  —  CONFIG
// Baut EINMAL den Claude-Client und stellt ihn der ganzen App
// zur Verfuegung (als "Bean"). Services koennen ihn dann nutzen.
// Der API-Key kommt aus application.properties.
// ============================================================

@Configuration
class AnthropicConfig(
    @Value("\${anthropic.api-key}") private val apiKey: String
) {
    @Bean
    fun anthropicClient(): AnthropicClient {
        return AnthropicOkHttpClient.builder()
            .apiKey(apiKey)
            .build()
    }
}
