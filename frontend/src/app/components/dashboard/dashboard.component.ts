import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api.service';
import { Creator } from '../../models/creator.model';

Chart.register(...registerables);

const AXIS_TICK = 'rgba(160,130,60,0.7)';
const AXIS_GRID = 'rgba(200,160,60,0.06)';
const GOLD_TONES = ['#f0b84a', '#c8922a', '#8a6020', '#4a3010'];
const DAY_NAMES = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

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
  sinceLabel = '';
  avgPerDay = '0.0';

  private dailyLabels: string[] = [];
  private dailyReplyRateData: number[] = [];
  private weekLabels: string[] = [];
  private dmPerWeekData: number[] = [];
  private nicheLabels: string[] = [];
  private nicheData: number[] = [];

  @ViewChild('lineChartCanvas') lineChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas') barChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChartCanvas') donutChartCanvas?: ElementRef<HTMLCanvasElement>;

  private lineChart?: Chart;
  private barChart?: Chart;
  private donutChart?: Chart;
  private chartsInitialized = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadKpis();
    this.loadDaily();
    this.pickQuote();
    this.loadAnalytics();
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

  get hasNicheData(): boolean { return this.nicheLabels.length > 0; }

  openAnalytics(): void {
    this.analyticsOpen = true;
    setTimeout(() => this.initCharts(), 150);
  }
  closeAnalytics(): void { this.analyticsOpen = false; }

  loadAnalytics(): void {
    this.api.getCreators().subscribe(creators => {
      this.buildAnalytics(creators);
      if (this.chartsInitialized) this.updateCharts();
    });
  }

  private buildAnalytics(creators: Creator[]): void {
    const sent = creators.filter(c => !!c.dmSentAt);
    const replied = creators.filter(c => c.replied);

    this.totalDms = sent.length;
    this.totalReplies = replied.length;
    this.wonCount = creators.filter(c => c.stage === 'won').length;
    this.lostCount = creators.filter(c => c.stage === 'lost').length;

    const fuSent = creators.filter(c => !!c.fu1SentAt);
    const fuReplied = fuSent.filter(c => c.replied);
    this.fuReplyRate = fuSent.length ? Math.round((fuReplied.length / fuSent.length) * 100) : 0;

    const versionCounts: Record<string, number> = {};
    replied.forEach(c => {
      const v = c.dmVersion || 'unknown';
      versionCounts[v] = (versionCounts[v] || 0) + 1;
    });
    let bestVersion = '—';
    let bestCount = 0;
    Object.entries(versionCounts).forEach(([v, count]) => {
      if (count > bestCount) { bestCount = count; bestVersion = v; }
    });
    this.bestVersion = bestVersion;

    const dmDates = sent.map(c => new Date(c.dmSentAt!).getTime());
    const sinceDate = dmDates.length ? new Date(Math.min(...dmDates)) : new Date();
    this.sinceLabel = sinceDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const daysSinceStart = Math.max(1, Math.round((Date.now() - sinceDate.getTime()) / 86400000));
    this.avgPerDay = (this.totalDms / daysSinceStart).toFixed(1);

    const nicheCounts: Record<string, number> = {};
    replied.forEach(c => {
      const n = c.niche || 'Other';
      nicheCounts[n] = (nicheCounts[n] || 0) + 1;
    });
    const nicheEntries = Object.entries(nicheCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
    this.nicheLabels = nicheEntries.map(e => e[0]);
    this.nicheData = nicheEntries.map(e => e[1]);

    const days7: Date[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days7.push(d);
    }
    this.dailyLabels = days7.map(d => DAY_NAMES[d.getDay()]);
    this.dailyReplyRateData = days7.map(d => {
      const next = new Date(d.getTime() + 86400000);
      const bucket = sent.filter(c => this.inRange(c.dmSentAt, d, next));
      if (!bucket.length) return 0;
      return Math.round((bucket.filter(c => c.replied).length / bucket.length) * 100);
    });

    const weekStarts = this.lastNWeekStarts(4);
    this.weekLabels = weekStarts.map((_, i) => 'W' + (i + 1));
    this.dmPerWeekData = weekStarts.map((w, i) => {
      const end = weekStarts[i + 1] ?? new Date(w.getTime() + 7 * 86400000);
      return sent.filter(c => this.inRange(c.dmSentAt, w, end)).length;
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

  private initCharts(): void {
    const lineCanvas = this.lineChartCanvas?.nativeElement;
    const barCanvas = this.barChartCanvas?.nativeElement;
    const donutCanvas = this.donutChartCanvas?.nativeElement;
    if (!lineCanvas || !barCanvas || !donutCanvas) return;

    if (!this.chartsInitialized) {
      this.createCharts(lineCanvas, barCanvas, donutCanvas);
      this.chartsInitialized = true;
    } else {
      this.updateCharts();
    }
  }

  private createCharts(lineCanvas: HTMLCanvasElement, barCanvas: HTMLCanvasElement, donutCanvas: HTMLCanvasElement): void {
    const ctx = lineCanvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 130);
    gradient.addColorStop(0, 'rgba(240,184,74,0.25)');
    gradient.addColorStop(1, 'rgba(240,184,74,0)');

    this.lineChart = new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: this.dailyLabels,
        datasets: [{
          data: this.dailyReplyRateData,
          borderColor: '#f0b84a',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#f0b84a',
          pointBorderColor: '#f0b84a'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: AXIS_GRID }, ticks: { color: AXIS_TICK, font: { size: 10 } } },
          y: {
            min: 0, max: 100,
            ticks: { stepSize: 25, color: AXIS_TICK, font: { size: 10 }, callback: v => v + '%' },
            grid: { color: AXIS_GRID }
          }
        }
      }
    });

    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: this.weekLabels,
        datasets: [{ data: this.dmPerWeekData, backgroundColor: 'rgba(200,146,42,0.7)', borderRadius: 5 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: AXIS_GRID }, ticks: { color: AXIS_TICK, font: { size: 10 } } },
          y: { beginAtZero: true, grid: { color: AXIS_GRID }, ticks: { color: AXIS_TICK, font: { size: 10 }, precision: 0 } }
        }
      }
    });

    const has = this.hasNicheData;
    this.donutChart = new Chart(donutCanvas, {
      type: 'doughnut',
      data: {
        labels: has ? this.nicheLabels : ['No data'],
        datasets: [{
          data: has ? this.nicheData : [1],
          backgroundColor: has ? GOLD_TONES : ['rgba(200,146,42,0.15)'],
          borderColor: has ? 'transparent' : 'rgba(200,146,42,0.3)',
          borderWidth: has ? 0 : 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });
  }

  private updateCharts(): void {
    if (this.lineChart) {
      this.lineChart.data.labels = this.dailyLabels;
      this.lineChart.data.datasets[0].data = this.dailyReplyRateData;
      this.lineChart.update();
    }
    if (this.barChart) {
      this.barChart.data.labels = this.weekLabels;
      this.barChart.data.datasets[0].data = this.dmPerWeekData;
      this.barChart.update();
    }
    if (this.donutChart) {
      const has = this.hasNicheData;
      this.donutChart.data.labels = has ? this.nicheLabels : ['No data'];
      this.donutChart.data.datasets[0].data = has ? this.nicheData : [1];
      this.donutChart.data.datasets[0].backgroundColor = has ? GOLD_TONES : ['rgba(200,146,42,0.15)'];
      (this.donutChart.data.datasets[0] as any).borderColor = has ? 'transparent' : 'rgba(200,146,42,0.3)';
      this.donutChart.update();
    }
  }
}
