import { Employee, EmployeeResponse } from './employees.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private apiUrl = 'http://localhost:3000/api/hr/user';

  constructor(private http: HttpClient) {}

  getEmployees(searchParams?: {
    firstName?: string;
    lastName?: string;
    preferredName?: string;
  }): Observable<{ employees: Employee[]; totalCount: number }> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');

    return this.http.get<EmployeeResponse>(
      `${this.apiUrl}/employees`,
      { 
        headers,
        params: searchParams
      }
    ).pipe(
      map(response => ({
        employees: response.data,
        totalCount: response.totalCount
      }))
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');

    return this.http.get<{ success: boolean; data: Employee }>(
      `${this.apiUrl}/employees/${id}`,
      { headers }
    ).pipe(
      map(response => response.data)
    );
  }
}
