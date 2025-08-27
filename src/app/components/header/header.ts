import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Auth } from '../../services/auth';
import { User } from '../../services/user';
import { ProfileUser, UserStore } from '../../services/user-store';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  userInitial: string = '';
  private sub!: Subscription;

  constructor(private userStore: UserStore, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.userStore.setUser({
    //     id: '1',
    //     username: 'johnDoe',
    //     email: 'john@example.com',
    //     firstName: 'John',
    //     role: 'user',
    //   });
    // }, 2000);
    this.sub = this.userStore.user$.subscribe((user: ProfileUser | null) => {
      console.log('Header received user update:', user);
      const name = user?.firstName || user?.username || '';
      this.userInitial = name.charAt(0).toUpperCase() || 'U';
      this.cdr.detectChanges();
      console.log('userInitial updated:', this.userInitial);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  @Output() search = new EventEmitter<string>();

  onInputChange(value: string) {
    this.search.emit(value);
  }
}
