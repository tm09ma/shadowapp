import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'outreach', loadComponent: () => import('./components/outreach/outreach.component').then(m => m.OutreachComponent) },
  { path: 'dm-generator', loadComponent: () => import('./components/dm-generator/dm-generator.component').then(m => m.DmGeneratorComponent) },
  { path: 'product', loadComponent: () => import('./components/product-dev/product-dev.component').then(m => m.ProductDevComponent) },
  { path: 'journal', loadComponent: () => import('./components/journal/journal.component').then(m => m.JournalComponent) },
  { path: 'calls', loadComponent: () => import('./components/calls/calls.component').then(m => m.CallsComponent) },
  { path: 'support', loadComponent: () => import('./components/support/support.component').then(m => m.SupportComponent) },
  { path: 'settings', loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent) },
];
