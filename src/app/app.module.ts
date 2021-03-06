import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnakeComponent } from './snake/snake.component';
import { TictacComponent } from './tictac/tictac.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BirdComponent } from './bird/bird.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { PianoComponent } from './piano/piano.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { RankingComponent } from './ranking/ranking.component';
import { MoreComponent } from './more/more.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeComponent,
    TictacComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    BirdComponent,
    CardComponent,
    PianoComponent,
    SudokuComponent,
    RankingComponent,
    MoreComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
