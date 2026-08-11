import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Creator } from '../../models/creator.model';

@Component({
  selector: 'app-calls', standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calls.component.html', styleUrl: './calls.component.css'
})
export class CallsComponent implements OnInit {
  booked: Creator[] = [];
  wonBox: Creator | null = null;
  productName = '';
  scheduleFor: Creator | null = null;
  callLabel = ''; callDate = '';

  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void { this.load(); }
  load(): void {
    // Creators mit gebuchtem Call ODER die geantwortet haben
    this.api.getCreators('call_booked').subscribe(b => this.booked = b);
  }

  openSchedule(c: Creator): void { this.scheduleFor = c; this.callLabel=''; this.callDate=''; }
  saveCall(): void {
    if (!this.scheduleFor?.id) return;
    this.api.scheduleCall({
      creatorId: this.scheduleFor.id, callNumber: 1,
      label: this.callLabel, scheduledAt: this.callDate || undefined, completed: false
    }).subscribe(() => { this.scheduleFor = null; this.load(); });
  }

  openWon(c: Creator): void { this.wonBox = c; this.productName = ''; }
  confirmWon(): void {
    if (!this.wonBox?.id) return;
    this.api.markWon(this.wonBox.id, this.productName).subscribe(() => {
      this.wonBox = null; this.load(); this.router.navigate(['/product']);
    });
  }
  markLost(c: Creator): void { if (c.id) this.api.markLost(c.id).subscribe(() => this.load()); }
}
