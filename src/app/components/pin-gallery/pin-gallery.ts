import { Component, OnInit } from '@angular/core';
import { Pin } from '../../interfaces/pin';
import { CommonModule } from '@angular/common';
import { PinService } from '../../services/pin-service';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'app-pin-gallery',
  imports: [CommonModule, Header, Sidebar],
  templateUrl: './pin-gallery.html',
  styleUrl: './pin-gallery.css',
})
export class PinGallery implements OnInit {
  images: Pin[] = [];

  constructor(private pinService: PinService) {}

  ngOnInit() {
    this.pinService.getPins().subscribe((data: any) => {
      this.images = data.data.pins;
      console.log(this.images);
    });
  }
}
