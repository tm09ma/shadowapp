package com.shadow.tracker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

// ============================================================
// ShadowTrackerApplication  —  der EINE Startpunkt.
// @SpringBootApplication schaltet die ganze Spring-Maschine an:
// scannt alle @Controller, @Service, @Repository und verdrahtet sie.
// ============================================================

@SpringBootApplication
class ShadowTrackerApplication

fun main(args: Array<String>) {
    runApplication<ShadowTrackerApplication>(*args)
}

