import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PinService } from '../../../services/pin-service';
import { Board, BoardService } from '../../../services/board';
import { User, UserService } from '../../../services/user-service';
import { Pin } from '../../../interfaces/pin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-pin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-pin.html',
  styleUrl: './update-pin.css',
})
export class UpdatePin implements OnInit {
  pinForm!: FormGroup;
  pinId!: string;
  boards: Board[] = [];
  users: User[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pinService: PinService,
    private boardService: BoardService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.pinForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i),
        ],
      ],
      createdBy: ['', Validators.required],
      board: ['', Validators.required],
      tags: [''],
      repinFrom: [''],
    });

    this.pinId = this.route.snapshot.paramMap.get('id') || '';
    console.log('this.pinId', this.pinId);
    this.loadUsers();
    this.loadBoards();
    this.loadPinData();
  }
  get f() {
    return this.pinForm.controls;
  }
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Users:', this.users);
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }
  loadBoards() {
    this.boardService.getBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
        console.log('Boards:', this.boards);
      },
      error: (err) => {
        console.error('Error loading boards:', err);
      },
    });
  }
  loadPinData() {
    this.pinService.getPinById(this.pinId).subscribe({
      next: (pin: Pin) => {
        console.log('Loaded pin:', pin);
        this.pinForm.patchValue({
          ...pin,
          tags: pin.tags?.join(' ') || '',
        });
      },
      error: (err) => {
        console.error('Error loading pin:', err);
        alert('Failed to load pin data');
        this.router.navigate(['/home']); // or some fallback route
      },
    });
  }

  // loadPinData() {
  //   this.pinService.getPinById(this.pinId).subscribe({
  //     next: (pin: Pin) => {
  //       console.log('Loaded pin:', pin); // تأكد من شكل البيانات هنا

  //       this.pinForm.patchValue({
  //         title: pin.title,
  //         description: pin.description,
  //         imageUrl: pin.imageUrl,
  //         createdBy: pin.createdBy?._id || pin.createdBy || '', // إذا createdBy هو كائن أو id
  //         board: pin.board?._id || pin.board || '',
  //         tags: pin.tags?.join(' ') || '',
  //         repinFrom: pin.repinFrom || '',
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Error loading pin:', err);
  //       alert('Failed to load pin data');
  //       this.router.navigate(['/home']);
  //     },
  //   });
  // }
  onSubmit() {
    if (this.pinForm.invalid) {
      this.pinForm.markAllAsTouched();
      return;
    }
    const formData = { ...this.pinForm.value };

    // Convert tags to array
    if (formData.tags && typeof formData.tags === 'string') {
      formData.tags = formData.tags
        .split(/\s+|,+/)
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);
    } else {
      formData.tags = [];
    }

    this.pinService.updatePin(this.pinId, formData).subscribe({
      next: () => {
        alert('Pin updated successfully!');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error updating pin:', error);
        alert('Failed to update pin');
      },
    });
  }
}
