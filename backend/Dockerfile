# ============================================================
# Dockerfile — Backend (Render)
# Multi-Stage-Build: erst mit Gradle das bootJar bauen, dann in
# ein schlankes JRE-21-Image kopieren und starten. Der Port kommt
# von Render ueber die Umgebungsvariable PORT (application.properties).
# ============================================================

# ---- Build stage ----
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Gradle-Wrapper zuerst kopieren und aufwaermen -> nutzt Docker-Layer-Cache,
# solange sich Abhaengigkeiten nicht aendern.
COPY gradlew ./
COPY gradle gradle
COPY settings.gradle.kts build.gradle.kts ./
RUN chmod +x gradlew
RUN ./gradlew --no-daemon --version

COPY src src
RUN ./gradlew --no-daemon bootJar -x test

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
