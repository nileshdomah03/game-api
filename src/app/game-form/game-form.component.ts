import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../game.model';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss',
})
export class GameFormComponent implements OnInit {
  game: Game = {
    id: 0,
    title: '',
    developer: '',
    genre: '',
    description: '',
    price: '',
  }; // Holds game details
  gameForm: FormGroup; // Form group for managing form controls and validation
  isEditMode: boolean = false; // Flag to check if the form is in edit mode
  isModalOpen: boolean = true; // Controls the visibility of the modal

  constructor(
    private route: ActivatedRoute, // Handles route parameters
    private router: Router, // For navigation
    private gameService: GameService, // Service for managing game data
    private fb: FormBuilder // FormBuilder for creating reactive forms
  ) {
    // Initialize form with validators
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      developer: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required], // Use a number here
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get game ID from route parameters

    if (id) {
      this.isEditMode = true; // Set form to edit mode if ID is available
      this.gameService.getGameById(id).subscribe((game) => {
        this.game = game; // Fetch game details
        this.gameForm.patchValue(game); // Populate form with game details
      });
    }
  }

  saveGame(): void {
    if (this.gameForm.valid) {
      const game = this.gameForm.value; // Get form values
      if (this.isEditMode) {
        game.id = this.game.id; // Set game ID for update
        this.gameService.updateGame(game).subscribe(
          () => {
            this.router.navigate(['/']); // Navigate back to the home page after updating
          },
          (error) => {
            console.error('Error updating game:', error); // Log error if update fails
          }
        );
      } else {
        this.gameService.addGame(game).subscribe(
          () => {
            this.router.navigate(['/']); // Navigate back to the home page after adding
          },
          (error) => {
            console.error('Error adding game:', error); // Log error if adding fails
          }
        );
      }
    }
  }

  closeModal(): void {
    this.isModalOpen = false; // Close the modal
    this.router.navigate(['/games']); // Navigate back to the games list or another route
  }
}
