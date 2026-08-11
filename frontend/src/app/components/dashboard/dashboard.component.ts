import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  kpis: any = { sales: 0, pipeline: 0, won: 0, replyRate: 0 };
  period = 'total';
  daily: any = { goals: [], allDone: false, challengeCompleted: false, streak: 0, dmsSentToday: 0, dmsGoal: 15 };
  justCompleted = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.loadKpis(); this.loadDaily(); }

  loadKpis(): void { this.api.getKpis(this.period).subscribe(k => this.kpis = k); }
  loadDaily(): void { this.api.getDailyStatus().subscribe(d => this.daily = d); }

  setPeriod(p: string): void { this.period = p; this.loadKpis(); }

  toggleGoal(g: any): void {
    if (g.autoTracked) return;
    this.api.toggleGoal(g.id).subscribe(() => this.loadDaily());
  }

  complete(): void {
    this.justCompleted = true;
    setTimeout(() => {
      this.api.completeChallenge().subscribe(s => {
        this.daily.challengeCompleted = true;
        this.daily.streak = s.current;
      });
    }, 1200);
  }
}
