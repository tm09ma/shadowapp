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
  openId: number | null = null;
  checklist: ChecklistItem[] = [];
  newItemText: { [phase: string]: string } = { development: '', test: '', launch: '' };
  phases = ['development', 'test', 'launch'];

  constructor(private api: ApiService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.api.getProducts().subscribe(p => this.products = p); }

  open(p: Product): void {
    this.openId = p.id!;
    this.api.getChecklist(p.id!).subscribe(c => this.checklist = c);
  }
  get openProduct(): Product | undefined { return this.products.find(p => p.id === this.openId); }

  itemsFor(phase: string): ChecklistItem[] { return this.checklist.filter(i => i.phase === phase); }
  isLive(p: Product): boolean { return p.stage === 'launch'; }

  save(p: Product): void { if (p.id) this.api.updateProduct(p.id, p).subscribe(); }
  advance(p: Product): void { if (p.id) this.api.advanceProduct(p.id).subscribe(u => { Object.assign(p, u); }); }
  togglePhaseDone(p: Product, phase: string, done: boolean): void {
    if (p.id) this.api.markPhaseDone(p.id, phase, done).subscribe(u => Object.assign(p, u));
  }
  addItem(phase: string): void {
    const text = this.newItemText[phase]?.trim();
    if (!text || !this.openId) return;
    this.api.addChecklistItem(this.openId, phase, text).subscribe(i => {
      this.checklist.push(i); this.newItemText[phase] = '';
    });
  }
  toggleItem(i: ChecklistItem): void { if (i.id) this.api.toggleChecklistItem(i.id).subscribe(u => i.done = u.done); }
  deleteItem(i: ChecklistItem): void { if (i.id) this.api.deleteChecklistItem(i.id).subscribe(() => this.checklist = this.checklist.filter(x => x.id !== i.id)); }

  phaseDoneFlag(p: Product, phase: string): boolean {
    return phase === 'development' ? p.devDone : phase === 'test' ? p.testDone : p.launchDone;
  }
}
