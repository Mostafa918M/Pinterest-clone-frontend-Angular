import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePin } from './update-pin';

describe('UpdatePin', () => {
  let component: UpdatePin;
  let fixture: ComponentFixture<UpdatePin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
