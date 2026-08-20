import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Settings, DailyGoal } from '../../models/misc.model';
import { Creator, CreatorDto } from '../../models/creator.model';

@Component({
  selector: 'app-settings', standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html', styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  s?: Settings;
  goals: DailyGoal[] = [];
  vault: Creator[] = [];
  rejected: Creator[] = [];

  // vault add
  vaultRows: CreatorDto[] = [{ handle: '' }];
  vaultSearch = '';
  customGoal = '';
  bulkHandles = '';

  predefinedGoals = [
    { type: 'dms', label: 'Send DMs' },
    { type: 'engagement', label: 'Engage with creators' },
    { type: 'followups', label: 'Send follow-ups' },
    { type: 'journal', label: 'Write journal' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSettings().subscribe({
      next: s => this.s = s,
      error: () => this.s = {
        id: 1,
        fuFirstDays: 1,
        fuSecondDays: 3,
        fuThirdEnabled: false,
        fuThirdDays: 7,
        leadsPerDay: 15,
        rejectAfterDays: 7,
        whopApiKey: '',
        darkMode: true,
        language: 'en'
      }
    });
    this.loadGoals(); this.loadVault(); this.loadRejected();
  }
  loadGoals(): void { this.api.getGoals().subscribe(g => this.goals = g); }
  loadVault(): void { this.api.getVault().subscribe(v => this.vault = v); }
  loadRejected(): void { this.api.getRejected().subscribe(r => this.rejected = r); }

  save(): void {
    if (!this.s) return;
    this.s.leadsPerDay = Math.min(20, Math.max(15, this.s.leadsPerDay));
    this.api.updateSettings(this.s).subscribe(u => this.s = u);
  }
  step(field: 'leadsPerDay'|'fuFirstDays'|'fuSecondDays'|'fuThirdDays'|'rejectAfterDays', delta: number): void {
    if (!this.s) return;
    (this.s as any)[field] = Math.max(1, (this.s as any)[field] + delta);
    this.save();
  }
  disableThird(): void {
    if (!this.s) return;
    this.s.fuThirdEnabled = false;
    this.save();
  }

  // Goals
  hasGoal(type: string): boolean { return this.goals.some(g => g.type === type && g.type !== 'custom'); }
  addPredefined(g: {type:string,label:string}): void {
    if (this.hasGoal(g.type)) return;
    this.api.addGoal({ type: g.type, label: g.label, autoTracked: g.type==='dms'||g.type==='journal', sortOrder: this.goals.length }).subscribe(() => this.loadGoals());
  }
  addCustom(): void {
    if (!this.customGoal.trim()) return;
    this.api.addGoal({ type: 'custom', label: this.customGoal, autoTracked: false, sortOrder: this.goals.length }).subscribe(() => { this.customGoal=''; this.loadGoals(); });
  }
  removeGoal(g: DailyGoal): void { if (g.id) this.api.deleteGoal(g.id).subscribe(() => this.loadGoals()); }

  // Vault
  addVaultRow(): void { this.vaultRows.push({ handle: '' }); }
  saveVault(): void {
    const valid = this.vaultRows.filter(r => r.handle.trim());
    if (valid.length === 0) return;
    this.api.createBatch(valid).subscribe(() => { this.vaultRows = [{ handle: '' }]; this.loadVault(); });
  }
  deleteVaultCreator(c: Creator): void { if (c.id) this.api.deleteCreator(c.id).subscribe(() => this.loadVault()); }
  // Zeile "handle,niche,followers" - niche/followers optional, nur Handle noetig
  parseBulkLine(line: string): CreatorDto {
    const parts = line.split(',').map(p => p.trim());
    const dto: CreatorDto = { handle: parts[0] };
    if (parts[1]) dto.niche = parts[1];
    if (parts[2] && !isNaN(Number(parts[2]))) {
      dto.followers = Number(parts[2]);
    }
    return dto;
  }
  addBulkToVault(): void {
    const lines = this.bulkHandles.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;
    const dtos: CreatorDto[] = lines.map(l => this.parseBulkLine(l));
    this.api.createBatch(dtos).subscribe(() => { this.bulkHandles = ''; this.loadVault(); });
  }
  get filteredVault(): Creator[] {
    const q = this.vaultSearch.toLowerCase();
    if (!q) return this.vault;
    return this.vault.filter(c => c.handle.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q) || String(c.followers).includes(q));
  }
}
