import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { JournalEntry } from '../../models/misc.model';

@Component({
  selector: 'app-journal', standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './journal.component.html', styleUrl: './journal.component.css'
})
export class JournalComponent implements OnInit {
  entries: JournalEntry[] = [];
  adding = false;
  draft: JournalEntry = {};

  constructor(private api: ApiService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.api.getJournal().subscribe(e => this.entries = e); }

  save(): void {
    if (!this.draft.title && !this.draft.body && !this.draft.wentWell && !this.draft.blocked && !this.draft.tomorrow) return;
    this.api.createJournal(this.draft).subscribe(() => {
      this.draft = {}; this.adding = false; this.load();
    });
  }
}
