package com.shadow.tracker.controller

import com.shadow.tracker.dto.DmRequest
import com.shadow.tracker.dto.DmResponse
import com.shadow.tracker.entity.ChatMessage
import com.shadow.tracker.service.DmGeneratorService
import com.shadow.tracker.service.SupportChatService
import org.springframework.web.bind.annotation.*

data class ChatRequest(val message: String)
data class ChatResponse(val reply: String)

@RestController
@RequestMapping("/api/ai")
class AiController(
    private val dmGeneratorService: DmGeneratorService,
    private val supportChatService: SupportChatService
) {
    @PostMapping("/generate-dms")
    fun generateDms(@RequestBody request: DmRequest): DmResponse =
        dmGeneratorService.generate(request)

    @PostMapping("/chat")
    fun chat(@RequestBody request: ChatRequest): ChatResponse =
        ChatResponse(supportChatService.chat(request.message))

    @GetMapping("/chat-history")
    fun history(): List<ChatMessage> = supportChatService.getHistory()

    @PostMapping("/daily-briefing")
    fun dailyBriefing(): ChatResponse = ChatResponse(supportChatService.dailyBriefing())
}
