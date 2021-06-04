import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  scores: any;
  constructor(private webReqService: WebRequestService) {}

  getScores() {
    this.webReqService.get('/game-scores').subscribe((data) => {
      this.scores = data;
    });
  }

  ngOnInit(): void {
    this.getScores();
  }

  ifGameNew(type: boolean) {
    return this.games.filter((x) => x.isNew === type);
  }

  games = [
    {
      name: 'snake snack',
      photo: '../../assets/images/snake.png',
      isNew: false,

      url: '../snake-component',
    },
    {
      name: 'tic-tac-toe',
      photo: '../../assets/images/tic-tac-toe.png',
      isNew: false,

      url: '../tictac-component',
    },
    {
      name: 'poké memory',
      photo: '../../assets/images/memory.png',
      isNew: false,

      url: '../card-component',
    },
    {
      name: 'real piano',
      photo: '../../assets/images/piano.png',
      isNew: true,
      url: '../piano-component',
    },
    {
      name: 'fake bird',
      photo: '../../assets/images/bird.png',
      isNew: true,
      url: '../bird-component',
    },
  ];
}
