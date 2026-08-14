import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Product, ChecklistItem } from '../../models/product.model';

@Component({
  selector: 'app-product-dev', standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-dev.component.html', styleUrl: './product-dev.component.css'
})
export class ProductDevComponent implements OnInit {
  products: Product[] = [];
  openIds: Set<number> = new Set();
  checklistMap = new Map<number, ChecklistItem[]>();
  creatorHandles = new Map<number, string>();
  newItemText: { [key: string]: string } = {};
  phases = ['development', 'test', 'launch'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
    this.api.getCreators().subscribe(creators => {
      creators.forEach(c => { if (c.id) this.creatorHandles.set(c.id, c.handle); });
    });
  }

  load(): void { this.api.getProducts().subscribe(p => this.products = p); }

  toggleProduct(id: number): void {
    if (this.openIds.has(id)) {
      this.openIds.delete(id);
      return;
    }
    this.openIds.add(id);
    if (!this.checklistMap.has(id)) {
      this.api.getChecklist(id).subscribe(c => this.checklistMap.set(id, c));
    }
  }

  handleFor(p: Product): string { return this.creatorHandles.get(p.creatorId) || ('#' + p.creatorId); }

  itemsFor(p: Product, phase: string): ChecklistItem[] {
    return (this.checklistMap.get(p.id!) || []).filter(i => i.phase === phase);
  }
  isLive(p: Product): boolean { return p.stage === 'launch'; }

  save(p: Product): void { if (p.id) this.api.updateProduct(p.id, p).subscribe(); }
  advance(p: Product): void { if (p.id) this.api.advanceProduct(p.id).subscribe(u => { Object.assign(p, u); }); }
  togglePhaseDone(p: Product, phase: string, done: boolean): void {
    if (p.id) this.api.markPhaseDone(p.id, phase, done).subscribe(u => Object.assign(p, u));
  }

  itemKey(p: Product, phase: string): string { return p.id + ':' + phase; }

  addItem(p: Product, phase: string): void {
    const key = this.itemKey(p, phase);
    const text = this.newItemText[key]?.trim();
    if (!text || !p.id) return;
    this.api.addChecklistItem(p.id, phase, text).subscribe(i => {
      const list = this.checklistMap.get(p.id!) || [];
      list.push(i);
      this.checklistMap.set(p.id!, list);
      this.newItemText[key] = '';
    });
  }
  toggleItem(p: Product, i: ChecklistItem): void {
    if (i.id) this.api.toggleChecklistItem(i.id).subscribe(u => i.done = u.done);
  }
  deleteItem(p: Product, i: ChecklistItem): void {
    if (i.id) this.api.deleteChecklistItem(i.id).subscribe(() => {
      const list = (this.checklistMap.get(p.id!) || []).filter(x => x.id !== i.id);
      this.checklistMap.set(p.id!, list);
    });
  }

  phaseDoneFlag(p: Product, phase: string): boolean {
    return phase === 'development' ? p.devDone : phase === 'test' ? p.testDone : p.launchDone;
  }
}
