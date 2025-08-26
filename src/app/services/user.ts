import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE } from '../api.token';

@Injectable({
  providedIn: 'root'
})
export class User {
   private http = inject(HttpClient);
  private api = inject(API_BASE);

  getUserProfile() {
    return this.http.get(`${this.api}api/v1/users/profile`,{ withCredentials: true });
  }

  updateUserProfile(data: any) {
    return this.http.put(`${this.api}/user/profile`, data);
  }
}
