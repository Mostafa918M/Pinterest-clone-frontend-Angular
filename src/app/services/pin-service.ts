import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pin } from '../interfaces/pin';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private apiUrl = 'http://localhost:3000/api/v1/pins';

  constructor(private http: HttpClient) {}

  getPins(): Observable<Pin[]> {
    return this.http.get<Pin[]>(this.apiUrl);
  }

  createPin(pinData: any): Observable<Pin> {
    const token = sessionStorage.getItem('accessToken');
    console.log('token', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Pin>(this.apiUrl, pinData, { headers });
  }

  getPinById(id: string): Observable<Pin> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data.pin));
  }

  updatePin(id: string, pinData: any): Observable<Pin> {
    const token = sessionStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Pin>(`${this.apiUrl}/${id}`, pinData, { headers });
  }
}
