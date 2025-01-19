import { Employee } from './employees.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private apiUrl = 'http://localhost:3000/api/hr/user/employees';

  constructor(private http: HttpClient) {}

  getEmployees(searchParams?: {
    firstName?: string;
    lastname?: string;
    preferredName?: string;
  }): Observable<{ employees: Employee[]; totalCount: number }> {
    return this.http.get<{ employees: Employee[]; totalCount: number }>(
      this.apiUrl,
      { params: searchParams }
    );
  }
}
