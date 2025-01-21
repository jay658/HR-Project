import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Onboarding } from 'src/app/interfaces/Types';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private apiUrl = 'http://localhost:3000/api/hr/onboarding/';

  constructor(private http: HttpClient) {}

  getOnboardings(): Observable<Onboarding[]> {
    return this.http.get<Onboarding[]>(this.apiUrl);
  }

  updateStatus(status: 'rejected' | 'approved', onboardingId: string): Observable<{ message: string, updatedOnboarding: Onboarding}>{
    return this.http.put<{message: string, updatedOnboarding: Onboarding}>(`${this.apiUrl}updateStatus/${onboardingId}`, { status });
  }
}