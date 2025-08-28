import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_BASE } from '../api.token';
import { ProfileUser } from '../core/pages/profile/profile';

@Injectable({
  providedIn: 'root'
})
export class User {
    private http = inject(HttpClient);
  private api = inject(API_BASE);
    readonly profile = signal<ProfileUser | null>(null);
  private _loadedOnce = false;

  getUserProfile() {
    return this.http.get(`${this.api}api/v1/users/profile`,{ withCredentials: true });
  }
     setProfile(u: ProfileUser | null) {
    this.profile.set(u);
    this._loadedOnce = true;
  }

  updateUserProfile(data: any) {
    return this.http.put(`${this.api}/user/profile`, data);
  }
}
