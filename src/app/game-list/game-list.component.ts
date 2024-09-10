import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  games: Game[] = []; // Holds the list of all games
  filteredGames: Game[] = []; // Holds the list of games after filtering
  searchTerm: string = ''; // Holds the current search term
  gameGroups: Game[][] = []; // Holds the games grouped into sets of 6 for the carousel

  showPaymentForm: Boolean = false; // Controls the visibility of the payment form

  constructor(
    private gameService: GameService, // Service for managing game data
    private router: Router // For navigation
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data; // Fetch and store all games
      this.filteredGames = data; // Initialize filtered games with all games
      this.groupGames(); // Group games for the carousel
    });
  }

  showMore(id: number): void {
    this.router.navigate(['/game', id]); // Navigate to game details page
  }

  addGame(): void {
    this.router.navigate(['/add-game']); // Navigate to add game page
  }

  searchGame(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredGames = this.games; // Reset to all games if search term is empty
    } else {
      this.gameService.searchGames(this.searchTerm).subscribe((data) => {
        this.filteredGames = data; // Update filtered games based on search term
      });
    }
    this.groupGames(); // Ensure games are grouped after filtering
  }

  groupGames(): void {
    this.gameGroups = [];
    for (let i = 0; i < this.filteredGames.length; i += 6) {
      this.gameGroups.push(this.filteredGames.slice(i, i + 6)); // Group games into sets of 6
    }
  }

  buyNow(game: Game): void {
    this.showPaymentForm = true; // Show the payment form when "Buy Now" is clicked
  }
}
