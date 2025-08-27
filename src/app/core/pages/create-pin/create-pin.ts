import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PinService } from '../../../services/pin-service';
import { User, UserService } from '../../../services/user-service';
import { Board, BoardService } from '../../../services/board';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-pin.html',
})
export class CreatePin implements OnInit {
  pinForm!: FormGroup;
  // boards = ['Board 1', 'Board 2', 'Board 3'];
  // createdBy = ['User 1', 'User 2', 'User 3'];
  boards: Board[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
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
    this.loadBoards();
    this.loadUsers();
  }
  loadBoards() {
    this.boardService.getBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
        console.log(this.boards);
      },
      error: (err) => {
        console.error('Error loading boards', err);
      },
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error loading users', err);
      },
    });
  }
  get f() {
    return this.pinForm.controls;
  }
  onSubmit() {
    if (this.pinForm.invalid) {
      this.pinForm.markAllAsTouched();
      return;
    }

    // Create a copy of the form value
    const formData = { ...this.pinForm.value };

    // Convert tags string to array
    if (formData.tags && typeof formData.tags === 'string') {
      formData.tags = formData.tags
        .split(/\s+|,+/) // split by spaces or commas
        .map((tag: string) => tag.trim()) // <-- add type here
        .filter((tag: string) => tag.length > 0);
    } else {
      formData.tags = [];
    }

    console.log('Form Data:', formData);
    this.pinService.createPin(formData).subscribe({
      next: (response) => {
        console.log('Pin created successfully:', response);
        this.pinForm.reset();
      },
      error: (error) => {
        console.error('Error creating pin:', error);
      },
    });
  }
}
