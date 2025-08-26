import { Component, inject } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { GoogleAuth } from '../../../services/google-auth';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PinGallery } from '../../../components/pin-gallery/pin-gallery';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, PinGallery],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private auth = inject(Auth);
  private router = inject(Router);
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
