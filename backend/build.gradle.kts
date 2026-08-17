// ============================================================
// build.gradle.kts
// Die "Bauanleitung" deines Projekts.
// Hier steht: welche Java-Version, welche Bausteine (Bibliotheken)
// dein Projekt braucht. Vergleichbar mit package.json in JS.
// ============================================================

plugins {
    // Kotlin fuer die JVM (Java Virtual Machine)
    kotlin("jvm") version "2.0.20"
    // Damit Kotlin die Spring-Annotations (@Entity etc.) versteht
    kotlin("plugin.spring") version "2.0.20"
    kotlin("plugin.jpa") version "2.0.20"
    // Spring Boot selbst
    id("org.springframework.boot") version "3.3.2"
    // Verwaltet automatisch passende Versionen aller Spring-Bausteine
    id("io.spring.dependency-management") version "1.1.6"
}

group = "com.shadow"
version = "0.0.1"

// Zwingt Spring Boot, ueberall Jackson 2.18.1 zu nutzen
// (passend zum anthropic-java SDK). Loest den Jackson-Versionskonflikt.
extra["jackson-bom.version"] = "2.18.1"

java {
    // Wir bauen fuer Java 21 (moderne, stabile Version)
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    // Wo Gradle die Bausteine herunterlaedt: das zentrale Maven-Lager
    mavenCentral()
}

dependencies {
    // --- Spring Web: baut die REST-API (Controller, HTTP) ---
    implementation("org.springframework.boot:spring-boot-starter-web")

    // --- Spring Data JPA: die Datenbank-Anbindung (Repository, Entity) ---
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    // --- Kotlin-Helfer, damit Spring sauber mit Kotlin arbeitet ---
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    // --- PostgreSQL-Treiber: damit wir mit Postgres (Supabase) reden ---
    runtimeOnly("org.postgresql:postgresql")

    // --- Der offizielle Anthropic (Claude) Java-Client ---
    implementation("com.anthropic:anthropic-java:0.8.0")

    // --- Kotlin Coroutines: fuer den SSE-Chat-Stream (Flow<String>) ---
    // spring-web bringt die SSE-Codecs (org.springframework.http.codec.ServerSentEvent)
    // bereits mit spring-boot-starter-web mit, kein spring-boot-starter-webflux noetig.
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor:1.7.3")

    // --- Zum Testen ---
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    // H2: schnelle In-Memory-Datenbank nur fuer Tests
    testImplementation("com.h2database:h2")
    // mockito-kotlin: Fakes ("Mocks") sauber in Kotlin schreiben
    testImplementation("org.mockito.kotlin:mockito-kotlin:5.4.0")
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions {
        // "-Xjsr305=strict" macht Kotlin strenger bei Null-Werten (gut so)
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "21"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
