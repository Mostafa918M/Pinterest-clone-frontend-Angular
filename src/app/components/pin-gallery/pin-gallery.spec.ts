import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinGallery } from './pin-gallery';

describe('PinGallery', () => {
  let component: PinGallery;
  let fixture: ComponentFixture<PinGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
