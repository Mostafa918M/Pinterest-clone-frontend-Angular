import { Component, inject, signal } from '@angular/core';
import { User } from '../../../services/user';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { UserStore } from '../../../services/user-store';

export interface ProfileUser  {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  birthdate?: string;
  followers?: any[];
  following?: any[];
  boards?: any[];
  pins?: any[];
  bookmarks?: any[];
  likedPins?: any[];
  savedSearches?: any[];
  role: string;
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private userApi = inject(User);
  private auth = inject(Auth);
  private router = inject(Router);

  loading = true;
  errorMsg = '';
  u: ProfileUser | null = null;

  ngOnInit() { this.fetch(); }

  private fetch() {
    this.loading = true;
    this.errorMsg = '';
    this.userApi.getUserProfile().subscribe({
      next: (res: any) => {
        const user = res?.data?.user ?? res?.user ?? null;
        this.u = user;
        this.userApi.setProfile(user); 
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to load profile.';
        this.loading = false;
      }
    });
  }

  avatarFallback(name?: string) {
    const n = (name || '').trim();
    return n ? n[0].toUpperCase() : 'U';
  }

  fullName(u: ProfileUser) {
    const f = (u.firstName || '').trim();
    const l = (u.lastName || '').trim();
    return (f || l) ? `${f} ${l}`.trim() : u.username;
  }

  onSignOut() {
    this.auth.signOut().subscribe({
      next: () => {
        this.router.navigate(['']); 
      },
      error: (err) => {
        console.error('Error signing out', err);
        this.router.navigate(['']);
      }
    });
  }
}
