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
    return this.http.post<Pin>(this.apiUrl, pinData, { withCredentials: true });
  }

  getPinById(id: string): Observable<Pin> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data.pin));
  }

  updatePin(id: string, pinData: any): Observable<Pin> {
  return this.http.put<Pin>(`${this.apiUrl}/${id}`, pinData, { withCredentials: true });
  }
  getPinSearch(
    params: { search?: string; page?: number; limit?: number } = {}
  ) {
    return this.http.get<any>(this.apiUrl, {
      params: {
        search: params.search || '',
        page: params.page || 1,
        limit: params.limit || 10,
      },
    });
  }
}
