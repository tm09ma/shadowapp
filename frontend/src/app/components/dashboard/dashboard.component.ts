import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api.service';
import { Creator } from '../../models/creator.model';

Chart.register(...registerables);

const GOLD_TEXT = 'rgba(120,100,60,0.8)';
const GOLD_GRID = 'rgba(200,160,60,0.08)';
const GOLD_TONES = ['#f0b84a', '#c8922a', '#a5751f', '#8a6018', '#6b4a10', '#4a330a'];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  kpis: any = { sales: 0, pipeline: 0, won: 0, replyRate: 0 };
  period = 'total';
  daily: any = { goals: [], allDone: false, challengeCompleted: false, streak: 0, dmsSentToday: 0, dmsGoal: 15 };
  justCompleted = false;

  quotes: string[] = [
    'The money is in the follow-up.',
    'Consistency beats talent every single time.',
    'One DM can change everything.',
    'Volume is a strategy.',
    "Send it. You'll regret not sending more.",
    'Every no is closer to a yes.',
    'The pipeline never lies.',
    'Show up daily. Win eventually.',
    'Your outreach is your advertisement.',
    'Do it scared. Do it anyway.'
  ];
  todayQuote = '';

  analyticsOpen = false;
  totalDms = 0;
  totalReplies = 0;
  wonCount = 0;
  lostCount = 0;
  fuReplyRate = 0;
  bestVersion = '—';

  private weekLabels: string[] = [];
  private dmPerWeekData: number[] = [];
  private replyRatePerWeekData: number[] = [];
  private nicheLabels: string[] = [];
  private nicheData: number[] = [];

  @ViewChild('lineChartCanvas') lineChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas') barChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChartCanvas') donutChartCanvas?: ElementRef<HTMLCanvasElement>;

  private lineChart?: Chart;
  private barChart?: Chart;
  private donutChart?: Chart;
  private viewReady = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadKpis();
    this.loadDaily();
    this.pickQuote();
    this.loadAnalytics();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderCharts();
  }

  pickQuote(): void {
    const now = new Date();
    const seed = now.getDate() * 31 + now.getMonth();
    this.todayQuote = this.quotes[seed % this.quotes.length];
  }

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

  openAnalytics(): void { this.analyticsOpen = true; }
  closeAnalytics(): void { this.analyticsOpen = false; }

  loadAnalytics(): void {
    this.api.getCreators().subscribe(creators => {
      this.buildAnalytics(creators);
      this.renderCharts();
    });
  }

  private buildAnalytics(creators: Creator[]): void {
    const sent = creators.filter(c => !!c.dmSentAt);
    const replied = creators.filter(c => c.replied);

    this.totalDms = sent.length;
    this.totalReplies = replied.length;
    this.wonCount = creators.filter(c => c.stage === 'won').length;
    this.lostCount = creators.filter(c => c.stage === 'lost').length;

    const fuSent = creators.filter(c => c.fu1SentAt || c.fu2SentAt || c.fu3SentAt);
    const fuReplied = fuSent.filter(c => c.replied);
    this.fuReplyRate = fuSent.length ? Math.round((fuReplied.length / fuSent.length) * 100) : 0;

    const versionStats: Record<string, { sent: number; replied: number }> = {};
    sent.forEach(c => {
      const v = c.dmVersion || 'unknown';
      versionStats[v] = versionStats[v] || { sent: 0, replied: 0 };
      versionStats[v].sent++;
      if (c.replied) versionStats[v].replied++;
    });
    let bestVersion = '—';
    let bestRate = -1;
    Object.entries(versionStats).forEach(([v, s]) => {
      const rate = s.sent ? s.replied / s.sent : 0;
      if (rate > bestRate) { bestRate = rate; bestVersion = v; }
    });
    this.bestVersion = bestVersion;

    const nicheCounts: Record<string, number> = {};
    replied.forEach(c => {
      const n = c.niche || 'Other';
      nicheCounts[n] = (nicheCounts[n] || 0) + 1;
    });
    const nicheEntries = Object.entries(nicheCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    this.nicheLabels = nicheEntries.map(e => e[0]);
    this.nicheData = nicheEntries.map(e => e[1]);

    const weeks = this.lastNWeekStarts(8);
    this.weekLabels = weeks.map(w => `${w.getMonth() + 1}/${w.getDate()}`);
    this.dmPerWeekData = weeks.map((w, i) => {
      const end = weeks[i + 1] ?? new Date(w.getTime() + 7 * 86400000);
      return sent.filter(c => this.inRange(c.dmSentAt, w, end)).length;
    });
    this.replyRatePerWeekData = weeks.map((w, i) => {
      const end = weeks[i + 1] ?? new Date(w.getTime() + 7 * 86400000);
      const bucket = sent.filter(c => this.inRange(c.dmSentAt, w, end));
      if (!bucket.length) return 0;
      return Math.round((bucket.filter(c => c.replied).length / bucket.length) * 100);
    });
  }

  private lastNWeekStarts(n: number): Date[] {
    const today = new Date();
    const day = (today.getDay() + 6) % 7; // Montag = 0
    const currentWeekStart = new Date(today);
    currentWeekStart.setHours(0, 0, 0, 0);
    currentWeekStart.setDate(today.getDate() - day);

    const starts: Date[] = [];
    for (let i = n - 1; i >= 0; i--) {
      starts.push(new Date(currentWeekStart.getTime() - i * 7 * 86400000));
    }
    return starts;
  }

  private inRange(date: string | undefined, start: Date, end: Date): boolean {
    if (!date) return false;
    const t = new Date(date).getTime();
    return t >= start.getTime() && t < end.getTime();
  }

  private renderCharts(): void {
    if (!this.viewReady) return;
    const lineCanvas = this.lineChartCanvas?.nativeElement;
    const barCanvas = this.barChartCanvas?.nativeElement;
    const donutCanvas = this.donutChartCanvas?.nativeElement;
    if (!lineCanvas || !barCanvas || !donutCanvas) return;

    this.lineChart?.destroy();
    this.lineChart = new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: this.weekLabels,
        datasets: [{
          data: this.replyRatePerWeekData,
          borderColor: '#f0b84a',
          backgroundColor: 'rgba(200,146,42,0.2)',
          fill: true,
          tension: 0.35,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: GOLD_TEXT }, grid: { color: GOLD_GRID } },
          y: { ticks: { color: GOLD_TEXT }, grid: { color: GOLD_GRID } }
        }
      }
    });

    this.barChart?.destroy();
    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: this.weekLabels,
        datasets: [{
          data: this.dmPerWeekData,
          backgroundColor: 'rgba(200,146,42,0.35)',
          borderColor: '#f0b84a',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: GOLD_TEXT }, grid: { display: false } },
          y: { ticks: { color: GOLD_TEXT }, grid: { color: GOLD_GRID } }
        }
      }
    });

    this.donutChart?.destroy();
    const hasNicheData = this.nicheLabels.length > 0;
    this.donutChart = new Chart(donutCanvas, {
      type: 'doughnut',
      data: {
        labels: hasNicheData ? this.nicheLabels : ['No data'],
        datasets: [{
          data: hasNicheData ? this.nicheData : [1],
          backgroundColor: hasNicheData ? GOLD_TONES : ['rgba(200,160,60,0.1)'],
          borderColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: GOLD_TEXT, boxWidth: 10, font: { size: 10 } } }
        }
      }
    });
  }
}
