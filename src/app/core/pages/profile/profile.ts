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

type ProfileUser = {
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
  private userStore = inject(UserStore);

  loading = true;
  saving = false;
  errorMsg = '';
  successMsg = '';
  u: ProfileUser | null = null;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    firstName: new FormControl('', [Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.minLength(2)]),
    bio: new FormControl('', [Validators.maxLength(500)]),
    birthdate: new FormControl<string | null>(null), // yyyy-MM-dd for input[type=date]
    avatar: new FormControl(''),
  });

  ngOnInit() {
    this.fetch();
  }

  private fetch() {
    this.loading = true;
    this.errorMsg = '';
    this.userApi.getUserProfile().subscribe({
      next: (res: any) => {
        const user = res?.data?.user ?? res?.user ?? null;
        console.log('API response:', res);
        console.log('Profile fetched user:', user);

        this.u = user;
        if (user) {
          console.log('Profile fetched user:', user);
          this.userStore.setUser(user);
          this.form.patchValue({
            username: user.username || '',
            email: user.email || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            bio: user.bio || '',
            avatar: user.avatar || '',
            birthdate: user.birthdate
              ? this.toDateInputValue(user.birthdate)
              : null,
          });
        }
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to load profile.';
        this.loading = false;
      },
    });
  }

  private toDateInputValue(iso: string) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private toIsoDate(dateInputValue: string | null) {
    if (!dateInputValue) return null;
    const [y, m, d] = dateInputValue.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d).toISOString();
  }

  avatarFallback(name?: string) {
    const n = (name || '').trim();
    return n ? n[0].toUpperCase() : 'U';
  }

  fullName(u: ProfileUser) {
    const f = (u.firstName || '').trim();
    const l = (u.lastName || '').trim();
    return f || l ? `${f} ${l}`.trim() : u.username;
  }

  onSignOut() {
    this.auth.signOut().subscribe({
      next: () => {
        this.auth.clearSession();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error signing out', err);

        this.auth.clearSession();
        this.router.navigate(['']);
      },
    });
  }
}
