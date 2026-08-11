import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Creator } from '../../models/creator.model';
import { DmResponse } from '../../models/dm.model';

@Component({
  selector: 'app-dm-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dm-generator.component.html',
  styleUrl: './dm-generator.component.css'
})
export class DmGeneratorComponent implements OnInit {
  creator: Creator | null = null;
  readyCreators: Creator[] = [];
  context = '';
  screenshots: string[] = [];
  previews: string[] = [];
  result: DmResponse | null = null;
  selected = '';
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const stored = sessionStorage.getItem('selectedCreator');
    if (stored) { this.creator = JSON.parse(stored); sessionStorage.removeItem('selectedCreator'); }
    // Falls kein Creator vorgewaehlt: Liste der DM-ready Creator zur Auswahl
    this.api.getCreators('dm_ready').subscribe(c => this.readyCreators = c);
  }

  pick(c: Creator): void { this.creator = c; }

  onFiles(event: Event): void {
    const files = Array.from((event.target as HTMLInputElement).files || []).slice(0, 3);
    this.screenshots = []; this.previews = [];
    files.forEach(f => {
      const r = new FileReader();
      r.onload = () => {
        const url = r.result as string;
        this.previews.push(url);
        this.screenshots.push(url.split(',')[1]);
      };
      r.readAsDataURL(f);
    });
  }

  generate(): void {
    if (!this.creator) return;
    this.loading = true; this.error = '';
    this.api.generateDms({
      handle: this.creator.handle, niche: this.creator.niche,
      followers: this.creator.followers, textContext: this.context, screenshots: this.screenshots
    }).subscribe({
      next: r => { this.result = r; this.selected = r.recommended; this.loading = false; },
      error: e => { this.error = 'Error: ' + (e.error?.message || e.message); this.loading = false; }
    });
  }

  selectVersion(id: string): void { this.selected = id; }
  get selectedText(): string { return this.result?.versions.find(v => v.id === this.selected)?.text || ''; }

  markSent(): void {
    if (!this.creator?.id) return;
    this.api.markDmSent(this.creator.id, this.selected, this.selectedText).subscribe(() => {
      this.router.navigate(['/outreach']);
    });
  }
}
