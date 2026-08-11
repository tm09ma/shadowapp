import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-support', standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html', styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit {
  messages: { role: string; text: string }[] = [];
  input = ''; loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.chatHistory().subscribe(h => {
      this.messages = h.map(m => ({ role: m.role, text: m.content }));
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
      });
    }
  }

  send(): void {
    const msg = this.input.trim();
    if (!msg) return;
    this.messages.push({ role: 'user', text: msg });
    this.input = ''; this.loading = true;
    this.api.chat(msg).subscribe({
      next: r => { this.messages.push({ role: 'assistant', text: r.reply }); this.loading = false; },
      error: e => { this.messages.push({ role: 'assistant', text: 'Error: ' + e.message }); this.loading = false; }
    });
  }
}
