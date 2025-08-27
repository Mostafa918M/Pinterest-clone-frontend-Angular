import { Component, OnInit } from '@angular/core';
import { Pin } from '../../interfaces/pin';
import { CommonModule } from '@angular/common';
import { PinService } from '../../services/pin-service';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pin-gallery',
  imports: [CommonModule, Header, Sidebar, RouterModule],
  templateUrl: './pin-gallery.html',
  styleUrl: './pin-gallery.css',
})
export class PinGallery implements OnInit {
  images: Pin[] = [];

  pins = [];
  searchTerm: string = '';

  constructor(private pinService: PinService) {}

  ngOnInit() {
    this.pinService.getPinSearch().subscribe((data: any) => {
      this.images = data.data.pins;
      console.log(this.images);
    });
    this.loadPins();
    // this.fetchPins();
  }

  onSearch(term: string) {
    this.searchTerm = term;
    console.log('this.searchTerm', this.searchTerm); // Logs "Karim"
    this.loadPins();
  }

  loadPins() {
    this.pinService.getPinSearch({ search: this.searchTerm }).subscribe({
      next: (res) => {
        console.log('Filtered pins response:', res);
        this.images = res.pins || res.data?.pins || [];
      },
      error: (err) => {
        console.error('Error loading pins:', err);
      },
    });
  }
}
