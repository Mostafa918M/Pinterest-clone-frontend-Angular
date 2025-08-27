import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Board {
  _id: string;
  name: string;
  description?: string;
  createdBy: string;
  isPrivate: boolean;
  pins: string[];
  createdAt?: string;
  updatedAt?: string;
}
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:3000/api/v1/boards';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => response.data.boards));
  }
}
