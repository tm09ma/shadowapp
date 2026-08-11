package com.shadow.tracker.config

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.web.filter.OncePerRequestFilter

// ============================================================
// AuthFilter  —  CONFIG
// Die App hat kein Login, daher schuetzt ein geheimer Token jede
// Anfrage an /api/**. Header "X-Auth-Token" muss exakt dem Wert
// der Umgebungsvariable APP_TOKEN entsprechen, sonst 401.
// CORS-Preflight-Requests (OPTIONS) werden immer durchgelassen,
// sonst kann der Browser nicht einmal die Preflight-Antwort lesen.
// ============================================================

class AuthFilter(private val appToken: String) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        if (request.method.equals(HttpMethod.OPTIONS.name(), ignoreCase = true)) {
            filterChain.doFilter(request, response)
            return
        }

        val token = request.getHeader("X-Auth-Token")
        if (token == null || token != appToken) {
            response.status = HttpServletResponse.SC_UNAUTHORIZED
            response.contentType = MediaType.APPLICATION_JSON_VALUE
            response.writer.write("""{"error":"Unauthorized"}""")
            return
        }

        filterChain.doFilter(request, response)
    }
}

@Configuration
class AuthFilterConfig(
    @Value("\${app.token}") private val appToken: String
) {
    @Bean
    fun authFilterRegistration(): FilterRegistrationBean<AuthFilter> {
        val registration = FilterRegistrationBean(AuthFilter(appToken))
        registration.addUrlPatterns("/api/*")
        registration.order = 1
        return registration
    }
}
