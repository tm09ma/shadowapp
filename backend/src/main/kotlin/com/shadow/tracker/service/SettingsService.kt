package com.shadow.tracker.service

import com.shadow.tracker.entity.Settings
import com.shadow.tracker.repository.SettingsRepository
import org.springframework.stereotype.Service

@Service
class SettingsService(
    private val settingsRepository: SettingsRepository
) {
    // Immer die eine Settings-Zeile holen (oder anlegen)
    fun get(): Settings =
        settingsRepository.findById(1).orElseGet { settingsRepository.save(Settings()) }

    fun update(patch: Settings): Settings {
        val s = get()
        s.fuFirstDays = patch.fuFirstDays
        s.fuSecondDays = patch.fuSecondDays
        s.fuThirdEnabled = patch.fuThirdEnabled
        s.fuThirdDays = patch.fuThirdDays
        s.leadsPerDay = patch.leadsPerDay.coerceIn(15, 20)
        s.rejectAfterDays = patch.rejectAfterDays
        s.whopApiKey = patch.whopApiKey
        s.darkMode = patch.darkMode
        s.language = patch.language
        return settingsRepository.save(s)
    }
}
