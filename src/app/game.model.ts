// Define the structure of a Game object
export interface Game {
  // Unique identifier for the game
  id: number;

  // Title of the game
  title: string;

  // Developer of the game
  developer: string;

  // Genre of the game (e.g., action, adventure, RPG)
  genre: string;

  // A brief description of the game
  description: string;

  // Price of the game
  price: string;
}
