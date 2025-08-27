import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProfileUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private userSubject = new BehaviorSubject<ProfileUser | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: ProfileUser) {
    console.log('UserStoreService setUser:', user);
    this.userSubject.next(user);
  }

  getUser(): ProfileUser | null {
    return this.userSubject.getValue();
  }

  clearUser() {
    this.userSubject.next(null);
  }
}
