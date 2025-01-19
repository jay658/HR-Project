import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisaService {
  private baseUrl = 'http://localhost:3000/api/hr/manage-visa/test'; 

  constructor(private http: HttpClient) { }

  getVisaManagementTest(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}`);
  }
}