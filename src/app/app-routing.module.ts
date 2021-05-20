import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirdComponent } from './bird/bird.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SnakeComponent } from './snake/snake.component';
import { TictacComponent } from './tictac/tictac.component';

const routes: Routes = [
  {
    path: 'snake-component',
    component: SnakeComponent,
  },
  { path: 'tictac-component', component: TictacComponent },
  { path: 'home-component', component: HomeComponent },
  { path: 'bird-component', component: BirdComponent },
  { path: 'card-component', component: CardComponent },

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
