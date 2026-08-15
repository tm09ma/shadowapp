import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {
  RouterOutlet, RouterLink, RouterLinkActive, Router,
  NavigationStart, NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ApiService } from './services/api.service';

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

  constructor(public router: Router, private api: ApiService) {
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
    this.api.getSettings().subscribe(s => {
      document.body.classList.toggle('light', !s.darkMode);
    });

    // Auto-Reject beim Start (bis Deployment)
    this.api.autoReject().subscribe();

    setTimeout(() => this.appLoaded = true, 100);

    // Blob muss auch bei direktem URL-Aufruf / Back-Forward am richtigen Tab landen.
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.updateBlob(this.activeIndex());
    });
  }

  ngAfterViewInit(): void {
    // Erst nach dem ersten Layout-Tick messen, sonst sind die Tab-Rects noch 0.
    setTimeout(() => this.updateBlob(this.activeIndex()), 0);
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
