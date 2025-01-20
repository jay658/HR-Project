import type { Document } from 'src/app/interfaces/Types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DocumentService {
  private baseUrl = 'http://localhost:3000/api/hr/user';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/documents`);
  }
}
