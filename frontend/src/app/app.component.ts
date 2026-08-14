import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
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

  constructor(public router: Router, private api: ApiService) {}

  ngOnInit(): void {
    // Auto-Reject beim Start (bis Deployment)
    this.api.autoReject().subscribe();

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
