import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisaResponse } from './visa.interfaces';

interface EmailNotificationResponse {
  mssg: string;
}

interface DocumentResponse {
  data: {
    _id: string;
    userId: string;
    type: string;
    status: string;
    fileKey: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VisaService {
  private baseUrl = 'http://localhost:3000/api/hr/manage-visa'; 
  private adminEmail = "smartkek0412@gmail.com"

  constructor(private http: HttpClient) { }

  getVisaManagementTest(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/test`);
  }

  getInProgressApplications(): Observable<VisaResponse> {
    return this.http.get<VisaResponse>(`${this.baseUrl}/in-progress`);
  }

  sendEmailNotification(receiver_email: string, receiver_name: string, nextStep: string): Observable<EmailNotificationResponse> {
    return this.http.post<EmailNotificationResponse>(`${this.baseUrl}/notification`, {
      receiver_email,
      receiver_name,
      nextStep
    });
  }

  getPendingDocument(userId: string, nextStep: string): Observable<DocumentResponse> {
    console.log(userId, nextStep)
    return this.http.get<DocumentResponse>(
      `${this.baseUrl}/pending?userId=${userId}&nextStep=${nextStep}`
    );
  }

  approveVisa(userId: string, nextStep: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve`, {
      userId,
      nextStep
    });
  }

  rejectVisa(userId: string, nextStep: string, comment: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject`, {
      userId,
      nextStep,
      comment
    });
  }

  searchEmployees(search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: { search }
    });
  }
}

