import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tabs = [
    { path: 'dashboard', label: 'Home' },
    { path: 'outreach', label: 'Outreach' },
    { path: 'dm-generator', label: 'DM Gen' },
    { path: 'product', label: 'Product' },
    { path: 'journal', label: 'Journal' },
    { path: 'calls', label: 'Calls' },
    { path: 'support', label: 'Mentor' },
  ];

  constructor(public router: Router, private api: ApiService) {}

  ngOnInit(): void {
    // Auto-Reject beim Start (bis Deployment)
    this.api.autoReject().subscribe();
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
