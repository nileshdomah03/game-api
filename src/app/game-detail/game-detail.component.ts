import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../game.model';
import { CommonModule, NgIfContext } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  game: Game | any; // Holds the details of the game

  showPaymentForm: Boolean = false; // Controls the visibility of the payment form
  not_found: TemplateRef<NgIfContext<any>> | null | undefined; // Template reference for 'not found' message

  constructor(
    private route: ActivatedRoute, // Handles route parameters
    private gameService: GameService, // Service for fetching game data
    private router: Router // For navigation
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get game ID from route parameters
    if (id) {
      this.gameService.getGameById(id).subscribe((game) => {
        this.game = game; // Fetch game details if ID is available
      });
    }
  }

  editGame(): void {
    if (this.game) {
      this.router.navigate(['/edit-game', this.game.id]); // Navigate to the edit page
    }
  }

  deleteGame(): void {
    if (this.game && confirm('Are you sure you want to delete this game?')) {
      this.gameService.deleteGame(this.game.id).subscribe(
        () => {
          this.router.navigate(['/']); // Navigate back to the list after deleting
        },
        (error) => {
          console.error('Error deleting game:', error); // Log error if delete fails
        }
      );
    }
  }

  addToCart(game: any): void {
    console.log('Adding to cart:', game); // Log the game being added to the cart
  }

  buyNow(game: Game): void {
    this.showPaymentForm = true; // Show the payment form when "Buy Now" is clicked
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
