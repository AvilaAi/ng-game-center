import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  games = [
    {
      name: 'snake',
      photo: '../../assets/images/snake.png',
      infos:
        'Snake is the common name for a video game concept where the player maneuvers a line which grows in length, with the line itself being a primary obstacle.',
      url: '../snake-component',
    },
    {
      name: 'tic-tac-toe',
      photo: '../../assets/images/tic-tac-toe.png',
      infos:
        'Tic-tac-toe is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner. ',
      url: '../tictac-component',
    },
    {
      name: 'memory',
      photo: '../../assets/images/memory.png',
      infos:
        'Tic-tac-toe is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner. ',
      url: '../card-component',
    },
  ];
}
