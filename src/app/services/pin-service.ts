import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pin } from '../interfaces/pin';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private apiUrl = 'http://localhost:3000/api/v1/pins/';

  constructor(private http: HttpClient) {}

  getPins(): Observable<Pin[]> {
    return this.http.get<Pin[]>(this.apiUrl);
  }
}
