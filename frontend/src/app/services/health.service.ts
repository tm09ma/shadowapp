import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HealthService {
  isWakingUp = false;
  private wakeTimeout: any;

  constructor(private http: HttpClient) {}

  checkHealth(): void {
    this.http.get(`${environment.apiUrl}/api/settings`,
      { headers: { 'X-Auth-Token': environment.authToken } }
    ).subscribe({
      next: () => {
        this.isWakingUp = false;
        clearTimeout(this.wakeTimeout);
      },
      error: () => {
        // Falls nach 5 Sekunden keine Antwort: Hinweis zeigen
        this.wakeTimeout = setTimeout(() => {
          this.isWakingUp = true;
        }, 5000);
      }
    });
  }
}
