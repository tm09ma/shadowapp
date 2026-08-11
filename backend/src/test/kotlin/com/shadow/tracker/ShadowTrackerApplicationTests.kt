package com.shadow.tracker

import com.anthropic.client.AnthropicClient
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean

// ============================================================
// Smoke-Test: Laedt der ganze Spring-Kontext ohne Fehler?
// Wir ersetzen den echten Claude-Client durch einen Fake (Mock),
// damit der Test keine echte API braucht.
// ============================================================

@SpringBootTest
class ShadowTrackerApplicationTests {

    @TestConfiguration
    class TestConfig {
        @Bean
        fun anthropicClient(): AnthropicClient = mock()
    }

    @Test
    fun contextLoads() {
        // Wenn der Kontext nicht laedt, schlaegt der Test automatisch fehl.
    }
}
