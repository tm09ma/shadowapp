import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-support', standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html', styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit {
  messages: { role: string; text: string }[] = [];
  input = ''; loading = false;

  @ViewChild('bottom') bottomEl!: ElementRef;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.chatHistory().subscribe(h => {
      this.messages = h.map(m => ({ role: m.role, text: m.content }));
      this.scrollToBottom();
      this.maybeDailyBriefing();
    });
  }

  // Tagesnachricht: einmal pro Tag beim Oeffnen nachholen
  maybeDailyBriefing(): void {
    const today = new Date().toISOString().slice(0, 10);
    const last = localStorage.getItem('lastBriefing');
    if (last !== today) {
      this.loading = true;
      this.api.dailyBriefing().subscribe(r => {
        this.messages.push({ role: 'assistant', text: r.reply });
        localStorage.setItem('lastBriefing', today);
        this.loading = false;
        this.scrollToBottom();
      });
    }
  }

  sendStreaming(msg: string): void {
    const trimmed = msg.trim();
    if (!trimmed) return;

    this.messages.push({ role: 'user', text: trimmed });
    this.input = ''; this.loading = true;
    this.scrollToBottom();

    // Leere Antwort-Bubble vorbereiten, waechst mit jedem Chunk
    const assistantMsg = { role: 'assistant', text: '' };
    this.messages.push(assistantMsg);

    // Native EventSource kann keine Header setzen - Token daher als Query-Param
    // (AuthFilter im Backend akzeptiert ihn dort als Fallback zum X-Auth-Token Header).
    const url = `${environment.apiUrl}/api/ai/chat-stream?message=${encodeURIComponent(trimmed)}&token=${encodeURIComponent(environment.authToken)}`;
    const es = new EventSource(url);

    es.onmessage = (event) => {
      assistantMsg.text += event.data;
      this.scrollToBottom();
    };
    es.onerror = () => {
      es.close();
      this.loading = false;
      this.scrollToBottom();
    };
  }

  scrollToBottom(): void {
    setTimeout(() => this.bottomEl?.nativeElement.scrollIntoView({ behavior: 'smooth' }), 50);
  }
}
