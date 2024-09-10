// Import necessary Angular modules and components
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameFormComponent } from './game-form/game-form.component';

export const routes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'add-game', component: GameFormComponent },
  { path: 'edit-game/:id', component: GameFormComponent },
];

export const AppRoutes = RouterModule.forRoot(routes);
