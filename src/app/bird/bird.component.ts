import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent implements OnInit {
  constructor() {}

  breakPosition = Math.random() * 300 + 150;
  breakHeight = Math.random() * 200 + 50;
  animationStop = false;

  autoMove = setTimeout(() => {}, 2000);
  ngOnInit() {
    this.gameStart();
  }

  gameStart() {
    this.autoMove = setInterval(() => {
      this.breakPosition = Math.random() * 300 + 150;
      this.breakHeight = Math.random() * 200 + 50;
    }, 2000);
  }

  ngOnDestroy() {
    if (this.autoMove) {
      clearInterval(this.autoMove);
    }
  }

  gameStop() {
    this.ngOnDestroy();
    this.animationStop = true;
  }
}
