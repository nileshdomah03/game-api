import { Injectable } from '@angular/core'; // Import the Injectable decorator
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs'; // Import Observable from RxJS
import { Game } from './game.model'; // Import the Game model

@Injectable({
  providedIn: 'root', // This service is provided at the root level, making it a singleton
})
export class GameService {
  private apiUrl = 'https://localhost:7282/api/games'; // Base URL for the API

  constructor(private http: HttpClient) {} // Inject HttpClient into the service

  // Get all games
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl); // Make a GET request to fetch all games
  }

  // Get a game by ID
  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`); // Make a GET request to fetch a specific game by ID
  }

  // Update a game
  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${game.id}`, game); // Make a PUT request to update the game
  }

  // Add a new game
  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game); // Make a POST request to add a new game
  }

  // Search for games
  searchGames(query: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/search?query=${query}`); // Make a GET request to search for games
  }

  // Delete a game by ID
  deleteGame(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Make a DELETE request to delete a game by ID
  }
}
