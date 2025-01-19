// housing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../models/housing.model';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private apiUrl = 'http://localhost:3000/api/hr/housing';

  constructor(private http: HttpClient) {}

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl);
  }

  addHouse(house: Partial<House>): Observable<House> {
    return this.http.post<House>(this.apiUrl, house);
  }

  deleteHouse(houseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${houseId}`);
  }
}
