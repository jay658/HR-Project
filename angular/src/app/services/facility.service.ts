import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  // Fix the base URL to not include the duplicate path
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  updateIssue(updateData: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');

    console.log('Token:', localStorage.getItem('token')); // Debug log
    console.log('Update Data:', updateData); // Debug log

    return this.http.patch(
      `${this.apiUrl}/hr/facilityIssue/${updateData.issueId}`,
      {
        status: updateData.status,
        comment: updateData.comment,
      },
      { headers }
    );
  }
}
