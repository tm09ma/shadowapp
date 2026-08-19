import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {
  RouterOutlet, RouterLink, RouterLinkActive, Router,
  NavigationStart, NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiService } from './services/api.service';
import { HealthService } from './services/health.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  tabs = [
    { path: 'dashboard' },
    { path: 'outreach' },
    { path: 'dm-generator' },
    { path: 'product' },
    { path: 'journal' },
    { path: 'calls' },
    { path: 'support' },
  ];

  @ViewChild('pillNav') pillNav?: ElementRef<HTMLElement>;
  @ViewChild('pillBlob') pillBlob?: ElementRef<HTMLElement>;
  @ViewChildren('pillTabs') pillTabs?: QueryList<ElementRef<HTMLElement>>;

  isLoading = false;
  progressDone = false;
  appLoaded = false;

  isDragging = false;
  dragStartX = 0;
  dragCurrentX = 0;
  dragBlobLeft = 0;

  constructor(public router: Router, private api: ApiService, public healthService: HealthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressDone = false;
        this.isLoading = true;
      }
      if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
        setTimeout(() => {
          this.isLoading = false;
          this.progressDone = true;
          setTimeout(() => { this.progressDone = false; }, 500);
        }, 200);
      }
    });
  }

  ngOnInit(): void {
    // Settings + Kern-Daten parallel laden (Cache befuellen) - macht Tab-Wechsel schneller
    forkJoin({
      settings: this.api.getSettings(),
      creators: this.api.getCreators(),
      kpis: this.api.getKpis('total'),
      goals: this.api.getGoals()
    }).subscribe(({ settings }) => {
      document.body.classList.toggle('light', !settings.darkMode);
    });
    // Auto-reject
    this.api.autoReject().subscribe();
    // Health check
    this.healthService.checkHealth();

    // Keep-Alive: verhindert dass der Render Free-Tier Cold-Start wieder eintritt,
    // solange die App offen ist. Behebt nicht den allerersten Start des Tages.
    setInterval(() => this.api.getSettings().subscribe(), 10 * 60 * 1000);

    setTimeout(() => this.appLoaded = true, 100);

    // Blob muss auch bei direktem URL-Aufruf / Back-Forward am richtigen Tab landen.
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.updateBlob(this.activeIndex());
    });
  }

  ngAfterViewInit(): void {
    // Erst nach dem ersten Layout-Tick messen, sonst sind die Tab-Rects noch 0.
    setTimeout(() => this.updateBlob(this.activeIndex()), 0);

    // touchmove muss passive:false sein damit preventDefault() das Scrollen
    // waehrend des Drags verhindert - das geht nicht ueber die (touchmove)
    // Template-Bindung (die ist immer passive), daher hier per addEventListener.
    const nav = document.getElementById('pillNav');
    if (nav) {
      nav.addEventListener('touchmove',
        (e) => this.onNavTouchMove(e as TouchEvent),
        { passive: false }
      );
    }
  }

  activeIndex(): number {
    const seg = this.router.url.split('/')[1] || 'dashboard';
    const i = this.tabs.findIndex(t => t.path === seg);
    return i >= 0 ? i : 0;
  }

  updateBlob(index: number): void {
    const navEl = this.pillNav?.nativeElement;
    const tabEl = this.pillTabs?.toArray()[index]?.nativeElement;
    const blobEl = this.pillBlob?.nativeElement;
    if (!navEl || !tabEl || !blobEl) return;
    const navRect = navEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();
    blobEl.style.width = tabRect.width + 'px';
    blobEl.style.left = (tabRect.left - navRect.left) + 'px';
  }

  onNavTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.dragStartX = event.touches[0].clientX;
    this.dragCurrentX = this.dragStartX;
  }

  onNavTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.dragCurrentX = event.touches[0].clientX;

    // Blob live mit Finger mitbewegen
    const nav = document.getElementById('pillNav');
    const blob = document.getElementById('pillBlob');
    if (!nav || !blob) return;

    const navRect = nav.getBoundingClientRect();
    const tabWidth = navRect.width / this.tabs.length;
    const fingerX = this.dragCurrentX - navRect.left;

    // Blob zentriert auf Finger setzen (innerhalb Nav-Grenzen)
    const blobWidth = tabWidth;
    const maxLeft = navRect.width - blobWidth;
    const newLeft = Math.max(0, Math.min(fingerX - blobWidth / 2, maxLeft));

    blob.style.transition = 'none'; // Kein smooth waehrend Drag
    blob.style.left = newLeft + 'px';
    blob.style.width = blobWidth + 'px';
  }

  onNavTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    // Welcher Tab ist unter dem Finger?
    const nav = document.getElementById('pillNav');
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const fingerX = this.dragCurrentX - navRect.left;
    const tabWidth = navRect.width / this.tabs.length;
    const tabIndex = Math.floor(fingerX / tabWidth);
    const clampedIndex = Math.max(0, Math.min(tabIndex, this.tabs.length - 1));

    // Blob wieder smooth machen und zum Tab snappen
    const blob = document.getElementById('pillBlob');
    if (blob) blob.style.transition = '';

    // Zum Tab navigieren
    const targetTab = this.tabs[clampedIndex];
    if (targetTab) {
      this.router.navigate(['/' + targetTab.path]);
      this.updateBlob(clampedIndex);
    }
  }

  get currentTitle(): string {
    const url = this.router.url.split('/')[1] || 'dashboard';
    const map: Record<string, string> = {
      dashboard: 'Dashboard', outreach: 'Outreach', 'dm-generator': 'DM Generator',
      product: 'Product Dev', journal: 'Journal', calls: 'Calls',
      support: 'Mentor', settings: 'Settings'
    };
    return map[url] || 'Shadow Tracker';
  }
}
