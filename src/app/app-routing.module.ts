import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirdComponent } from './bird/bird.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PianoComponent } from './piano/piano.component';
import { SnakeComponent } from './snake/snake.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { TictacComponent } from './tictac/tictac.component';

const routes: Routes = [
  {
    path: 'snake',
    component: SnakeComponent,
  },
  { path: 'tictac', component: TictacComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bird', component: BirdComponent },
  { path: 'card', component: CardComponent },
  { path: 'piano', component: PianoComponent },
  { path: 'sudoku', component: SudokuComponent },

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
