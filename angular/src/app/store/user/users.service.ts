import type { User, UserWithOnboarding } from 'src/app/interfaces/Types';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  private baseUrl = 'http://localhost:3000/api/hr/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getallusers`);
  }
}
