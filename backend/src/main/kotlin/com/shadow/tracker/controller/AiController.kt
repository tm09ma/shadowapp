package com.shadow.tracker.controller

import com.shadow.tracker.dto.DmRequest
import com.shadow.tracker.dto.DmResponse
import com.shadow.tracker.entity.ChatMessage
import com.shadow.tracker.service.DmGeneratorService
import com.shadow.tracker.service.SupportChatService
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.onCompletion
import org.springframework.http.codec.ServerSentEvent
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

    @GetMapping("/chat-stream", produces = ["text/event-stream"])
    fun chatStream(@RequestParam message: String): Flow<ServerSentEvent<String>> =
        supportChatService.chatStream(message)
            .map { delta -> ServerSentEvent.builder(delta).build() }
            // Signalisiert dem Frontend explizit dass der Stream fertig ist, damit es
            // die EventSource selbst schliesst statt auf ein natuerliches onerror zu warten
            // (das native EventSource sonst als Reconnect-Versuch faelschlicherweise auffasst).
            .onCompletion { cause ->
                if (cause == null) emit(ServerSentEvent.builder<String>().event("done").build())
            }

    @GetMapping("/chat-history")
    fun history(): List<ChatMessage> = supportChatService.getHistory()

    @PostMapping("/daily-briefing")
    fun dailyBriefing(): ChatResponse = ChatResponse(supportChatService.dailyBriefing())
}
