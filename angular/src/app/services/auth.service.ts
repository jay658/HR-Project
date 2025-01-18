import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_BASE_URL = 'http://localhost:3000/api/hr';

  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(
      `${this.API_BASE_URL}/user/login`,
      { username, password }
    );
  }
}
