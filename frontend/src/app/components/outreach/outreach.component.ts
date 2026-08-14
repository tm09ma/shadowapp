import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Creator } from '../../models/creator.model';
import { Settings } from '../../models/misc.model';

@Component({
  selector: 'app-outreach',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outreach.component.html',
  styleUrl: './outreach.component.css'
})
export class OutreachComponent implements OnInit {
  creators: Creator[] = [];
  settings?: Settings;
  loading = true;
  selectedForDm = new Set<number>();

  // Section collapse state. "active" starts collapsed, everything else starts open.
  collapsed: Record<string, boolean> = {
    active: true,
    engagement: false,
    dms: false,
    fu1: false,
    fu2: false,
    fu3: false,
  };
  toggle(section: string, count: number): void {
    if (count === 0) return;
    this.collapsed[section] = !this.collapsed[section];
  }

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getSettings().subscribe(s => this.settings = s);
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.getCreators().subscribe({
      next: c => { this.creators = c; this.loading = false; },
      error: () => this.loading = false
    });
  }

  get engage() { return this.creators.filter(c => c.stage === 'engage' && !c.inVault); }
  get dmReady() { return this.creators.filter(c => c.stage === 'dm_ready'); }
  get active() { return this.creators.filter(c => c.stage === 'replied'); }

  get firstFU() {
    const d = this.settings?.fuFirstDays ?? 1;
    return this.creators.filter(c => c.stage === 'dm_sent' && !c.fu1SentAt && this.daysSince(c.dmSentAt) >= d);
  }
  get secondFU() {
    const d = this.settings?.fuSecondDays ?? 2;
    return this.creators.filter(c => c.stage === 'dm_sent' && c.fu1SentAt && !c.fu2SentAt && this.daysSince(c.fu1SentAt) >= d);
  }
  get thirdFU() {
    if (!this.settings?.fuThirdEnabled) return [];
    const d = this.settings?.fuThirdDays ?? 3;
    return this.creators.filter(c => c.stage === 'dm_sent' && c.fu2SentAt && !c.fu3SentAt && this.daysSince(c.fu2SentAt) >= d);
  }

  daysSince(date?: string): number {
    if (!date) return 0;
    return Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  }

  fuOverdueDays(creator: Creator, fuNumber: number): number {
    let dueFrom: string | undefined;
    const settings = this.settings;
    if (fuNumber === 1) dueFrom = creator.dmSentAt;
    if (fuNumber === 2) dueFrom = creator.fu1SentAt;
    if (fuNumber === 3) dueFrom = creator.fu2SentAt;
    if (!dueFrom) return 0;

    const dueDays = fuNumber === 1 ? (settings?.fuFirstDays ?? 1)
      : fuNumber === 2 ? (settings?.fuSecondDays ?? 3)
      : (settings?.fuThirdDays ?? 7);

    const daysSince = Math.floor(
      (Date.now() - new Date(dueFrom).getTime()) / 86400000
    );
    return Math.max(0, daysSince - dueDays);
  }

  fuCardClass(creator: Creator, fuNumber: number): string {
    const overdue = this.fuOverdueDays(creator, fuNumber);
    if (overdue === 0) return 'fu-gold';
    if (overdue === 1) return 'fu-orange';
    return 'fu-red';
  }
  dayCount(c: Creator): number { return this.daysSince(c.addedAt) + 1; }
  fmtK(n: number): string { return n ? (n / 1000).toFixed(0) + 'k' : '?'; }

  heat(c: Creator): { icon: string; color: string } {
    const d = this.daysSince(c.lastExchangeAt);
    if (d <= 2) return { icon: '\uD83D\uDD25', color: 'var(--success)' };
    if (d <= 5) return { icon: '\uD83D\uDFE1', color: 'var(--warning)' };
    return { icon: '\u2744\uFE0F', color: 'var(--danger)' };
  }

  pullDaily(): void { this.api.pullDaily().subscribe(() => this.load()); }
  markReady(c: Creator): void { if (c.id) this.api.updateStage(c.id, 'dm_ready').subscribe(() => this.load()); }
  goGenerate(c: Creator): void {
    sessionStorage.setItem('selectedCreator', JSON.stringify(c));
    this.router.navigate(['/dm-generator']);
  }

  toggleDmSelect(id?: number): void {
    if (!id) return;
    if (this.selectedForDm.has(id)) this.selectedForDm.delete(id);
    else this.selectedForDm.add(id);
  }
  markSelectedSent(): void {
    if (this.selectedForDm.size === 0) return;
    this.api.markDmSentBatch(Array.from(this.selectedForDm)).subscribe(() => {
      this.selectedForDm.clear();
      this.load();
    });
  }

  markReplied(c: Creator): void { if (c.id) this.api.markReplied(c.id).subscribe(() => this.load()); }
  addExchange(c: Creator): void { if (c.id) this.api.addExchange(c.id).subscribe(() => this.load()); }
  sendFollowUp(c: Creator, n: number): void { if (c.id) this.api.markFollowUp(c.id, n).subscribe(() => this.load()); }
  bookCall(c: Creator): void { if (c.id) this.api.updateStage(c.id, 'call_booked').subscribe(() => this.load()); }
}
