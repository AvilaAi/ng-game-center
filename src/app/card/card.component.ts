import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  title = 'Poké Memory';
  numbers = Array(16);
  checkedCard: number[] = [];
  randomArray: number[] = [];
  matchedCard: number[] = [];
  timer = 60;
  random = 100;
  isGameStart = false;
  message = ' Turn over pairs of matching cards ';

  ngOnInit(): void {
    var a = [];
    var b = [];
    for (var a = [], i = 0; i < this.numbers.length / 2; ++i) {
      a[i] = i;
      b[i] = i;
    }
    a = this.shuffle(a);
    b = this.shuffle(b);

    this.randomArray = a.concat(b);
    this.random = Math.floor(Math.random() * 300) + 100;
    this.checkedCard = [];
    this.matchedCard = [];
  }

  countDown = setTimeout(() => {}, 1000);
  ngOnDestroy() {
    if (this.countDown) {
      clearInterval(this.countDown);
    }
  }

  toStartGame() {
    this.timer = 60;
    this.isGameStart = true;
    this.countDown = setInterval(() => {
      if (this.matchedCard.length === this.numbers.length) {
        this.isGameStart = false;
        this.message = 'You win';
        this.ngOnDestroy();
        this.ngOnInit();
      }
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.isGameStart = false;
        this.message = "Time's out";
        this.ngOnDestroy();
        this.ngOnInit();
      }
    }, 1000);
  }

  flipCard(id: any) {
    this.checkedCard.push(id);
    const lastItem = this.checkedCard[this.checkedCard.length - 2];
    if (this.checkedCard.length > 1) {
      if (this.randomArray[lastItem] === this.randomArray[id]) {
        this.matchedCard.push(id, lastItem);
      }

      setTimeout(() => {
        this.checkedCard = [];
      }, 850);
    }
  }

  shuffle(array: any) {
    var tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  }
}
