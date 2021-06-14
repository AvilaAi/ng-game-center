import { Component, OnInit } from '@angular/core';
import { games } from '../global';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ifGameNew(type: boolean) {
    return this.games.filter((x) => x.isNew === type);
  }
  games = games;
}
