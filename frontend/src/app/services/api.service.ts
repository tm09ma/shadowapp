import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Creator, CreatorDto } from '../models/creator.model';
import { Product, ChecklistItem } from '../models/product.model';
import { DmRequest, DmResponse } from '../models/dm.model';
import { Settings, DailyGoal, Call, JournalEntry, ChatMessage } from '../models/misc.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  private cache = new Map<string, { data: any; time: number }>();
  private CACHE_TTL = 30000; // 30 Sekunden

  constructor(private http: HttpClient) {}

  private getCached<T>(key: string, request: Observable<T>): Observable<T> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.time < this.CACHE_TTL) {
      return of(cached.data as T);
    }
    return request.pipe(
      tap(data => this.cache.set(key, { data, time: Date.now() }))
    );
  }

  invalidateCache(key?: string): void {
    if (key) this.cache.delete(key);
    else this.cache.clear();
  }

  // Creator-Schreibvorgaenge veraendern auch die Dashboard-KPIs (die aus den
  // Creators berechnet werden) - beide Caches muessen zusammen invalidieren.
  private invalidateCreatorCaches(): void {
    Array.from(this.cache.keys()).forEach(k => {
      if (k.startsWith('creators') || k.startsWith('kpis_')) this.cache.delete(k);
    });
  }

  // --- Creators ---
  getCreators(stage?: string): Observable<Creator[]> {
    const url = stage ? `${this.base}/api/creators?stage=${stage}` : `${this.base}/api/creators`;
    return this.getCached('creators_' + (stage || 'all'), this.http.get<Creator[]>(url));
  }
  createCreator(dto: CreatorDto) {
    return this.http.post<Creator>(`${this.base}/api/creators`, dto).pipe(tap(() => this.invalidateCreatorCaches()));
  }
  createBatch(dtos: CreatorDto[]) {
    return this.http.post<Creator[]>(`${this.base}/api/creators/batch`, dtos).pipe(tap(() => this.invalidateCreatorCaches()));
  }
  deleteCreator(id: number) {
    return this.http.delete<void>(`${this.base}/api/creators/${id}`).pipe(tap(() => this.invalidateCreatorCaches()));
  }

  // Vault
  getVault() { return this.http.get<Creator[]>(`${this.base}/api/creators/vault`); }
  pullDaily() {
    return this.http.post<Creator[]>(`${this.base}/api/creators/pull-daily`, {}).pipe(tap(() => this.invalidateCreatorCaches()));
  }

  // Rejected
  getRejected() { return this.http.get<Creator[]>(`${this.base}/api/creators/rejected`); }
  autoReject() {
    return this.http.post<{rejected: number}>(`${this.base}/api/creators/auto-reject`, {}).pipe(tap(() => this.invalidateCreatorCaches()));
  }

  // Stage / DM / Reply / Exchange / Follow-up
  updateStage(id: number, stage: string) {
    return this.http.patch<Creator>(`${this.base}/api/creators/${id}/stage?stage=${stage}`, {}).pipe(tap(() => this.invalidateCreatorCaches()));
  }
  markDmSent(id: number, version: string, text: string) {
    return this.http.patch<Creator>(`${this.base}/api/creators/${id}/dm-sent?version=${version}`, { text }).pipe(tap(() => this.invalidateCreatorCaches()));
  }
  markDmSentBatch(ids: number[]) {
    return this.http.post<Creator[]>(`${this.base}/api/creators/dm-sent-batch`, ids).pipe(tap(() => this.invalidateCreatorCaches()));
  }
  markReplied(id: number) {
    return this.http.patch<Creator>(`${this.base}/api/creators/${id}/replied`, {}).pipe(tap(() => this.invalidateCreatorCaches()));
  }
  addExchange(id: number) {
    return this.http.patch<Creator>(`${this.base}/api/creators/${id}/exchange`, {}).pipe(tap(() => this.invalidateCreatorCaches()));
  }
  markFollowUp(id: number, number: number) {
    return this.http.patch<Creator>(`${this.base}/api/creators/${id}/follow-up?number=${number}`, {}).pipe(tap(() => this.invalidateCreatorCaches()));
  }

  // --- Dashboard ---
  getKpis(period: string) {
    return this.getCached('kpis_' + period, this.http.get<any>(`${this.base}/api/dashboard?period=${period}`));
  }

  // --- Daily Challenge ---
  getDailyStatus() { return this.http.get<any>(`${this.base}/api/daily/status`); }
  getGoals() {
    return this.getCached('goals', this.http.get<DailyGoal[]>(`${this.base}/api/daily/goals`));
  }
  addGoal(goal: DailyGoal) {
    return this.http.post<DailyGoal>(`${this.base}/api/daily/goals`, goal).pipe(tap(() => this.invalidateCache('goals')));
  }
  deleteGoal(id: number) {
    return this.http.delete<void>(`${this.base}/api/daily/goals/${id}`).pipe(tap(() => this.invalidateCache('goals')));
  }
  toggleGoal(id: number) {
    return this.http.post<void>(`${this.base}/api/daily/goals/${id}/toggle`, {}).pipe(tap(() => this.invalidateCache('goals')));
  }
  completeChallenge() { return this.http.post<any>(`${this.base}/api/daily/complete`, {}); }

  // --- Products ---
  getProducts() { return this.http.get<Product[]>(`${this.base}/api/products`); }
  updateProduct(id: number, p: Product) { return this.http.patch<Product>(`${this.base}/api/products/${id}`, p); }
  advanceProduct(id: number) { return this.http.post<Product>(`${this.base}/api/products/${id}/advance`, {}); }
  markPhaseDone(id: number, phase: string, done: boolean) { return this.http.patch<Product>(`${this.base}/api/products/${id}/phase-done?phase=${phase}&done=${done}`, {}); }
  getChecklist(id: number) { return this.http.get<ChecklistItem[]>(`${this.base}/api/products/${id}/checklist`); }
  addChecklistItem(id: number, phase: string, text: string) { return this.http.post<ChecklistItem>(`${this.base}/api/products/${id}/checklist?phase=${phase}`, { text }); }
  toggleChecklistItem(itemId: number) { return this.http.patch<ChecklistItem>(`${this.base}/api/products/checklist/${itemId}/toggle`, {}); }
  deleteChecklistItem(itemId: number) { return this.http.delete<void>(`${this.base}/api/products/checklist/${itemId}`); }

  // --- Calls ---
  getCalls() { return this.http.get<Call[]>(`${this.base}/api/calls`); }
  callsForCreator(creatorId: number) { return this.http.get<Call[]>(`${this.base}/api/calls/creator/${creatorId}`); }
  scheduleCall(call: Call) { return this.http.post<Call>(`${this.base}/api/calls`, call); }
  updateCall(id: number, notes?: string, completed?: boolean) { return this.http.patch<Call>(`${this.base}/api/calls/${id}`, { notes, completed }); }
  markWon(creatorId: number, productName?: string) { const q = productName ? `?productName=${encodeURIComponent(productName)}` : ''; return this.http.post<Product>(`${this.base}/api/calls/won/${creatorId}${q}`, {}); }
  markLost(creatorId: number) { return this.http.post<void>(`${this.base}/api/calls/lost/${creatorId}`, {}); }

  // --- Journal ---
  getJournal() { return this.http.get<JournalEntry[]>(`${this.base}/api/journal`); }
  createJournal(entry: JournalEntry) { return this.http.post<JournalEntry>(`${this.base}/api/journal`, entry); }

  // --- Settings ---
  getSettings() {
    return this.getCached('settings', this.http.get<Settings>(`${this.base}/api/settings`));
  }
  updateSettings(s: Settings) {
    return this.http.patch<Settings>(`${this.base}/api/settings`, s).pipe(tap(() => this.invalidateCache('settings')));
  }

  // --- AI ---
  generateDms(req: DmRequest) { return this.http.post<DmResponse>(`${this.base}/api/ai/generate-dms`, req); }
  chat(message: string) { return this.http.post<{reply: string}>(`${this.base}/api/ai/chat`, { message }); }
  chatHistory() { return this.http.get<ChatMessage[]>(`${this.base}/api/ai/chat-history`); }
  dailyBriefing() { return this.http.post<{reply: string}>(`${this.base}/api/ai/daily-briefing`, {}); }
}
