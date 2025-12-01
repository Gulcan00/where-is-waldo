import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'game', component: GameComponent}
];
