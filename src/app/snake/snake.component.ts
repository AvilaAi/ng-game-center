import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
})
export class SnakeComponent implements OnInit {
  title = 'Snake Snack';
  numbers = Array(30);
  middle = this.numbers.length / 2;
  snake = [
    [this.middle - 3, this.middle + 1],
    [this.middle - 4, this.middle + 1],
    [this.middle - 5, this.middle + 1],
  ];
  snakeBody = [''];
  direction = 'E';
  score = 0;

  firstStart = true;
  toggleCard = true;
  isBusy = false;

  randomFruit(max: number) {
    const x = Math.floor(Math.random() * max);
    const y = Math.floor(Math.random() * max);
    return x + '-' + y;
  }
  fruit = this.randomFruit(this.numbers.length);

  toSnakeString = (x: number, y: number) => x + '-' + y;
  checkIndex() {
    return 1;
  }
  hasEatSelf(arr: string[]) {
    return new Set(arr).size !== arr.length;
  }
  snakeGo(dir: string) {
    var newSnakeCase = [0, 0];
    switch (dir) {
      case 'E':
        newSnakeCase = [this.snake[0][0] + 1, this.snake[0][1]];
        break;
      case 'S':
        newSnakeCase = [this.snake[0][0], this.snake[0][1] + 1];

        break;
      case 'W':
        newSnakeCase = [this.snake[0][0] - 1, this.snake[0][1]];

        break;
      case 'N':
        newSnakeCase = [this.snake[0][0], this.snake[0][1] - 1];

        break;

      default: {
        break;
      }
    }

    this.snake.unshift(newSnakeCase);

    if (this.snakeBody.indexOf(this.fruit) !== -1) {
      this.fruit = this.randomFruit(30);
      this.score++;
    } else {
      this.snake.pop();
    }

    this.snakeBody = this.snake.map((s) => {
      return s.join('-');
    });

    if (
      Math.max(...this.snake[0]) > 29 ||
      Math.min(...this.snake[0]) < 0 ||
      this.hasEatSelf(this.snakeBody)
    ) {
      this.ngOnDestroy();
    }
    this.isBusy = false;
  }

  autoMove = setTimeout(() => {}, 100);
  ngOnInit() {}

  ngOnDestroy() {
    if (this.autoMove) {
      clearInterval(this.autoMove);
      this.toggleCard = true;
    }
  }

  gameStart() {
    this.snake = [
      [this.middle - 3, this.middle + 1],
      [this.middle - 4, this.middle + 1],
      [this.middle - 5, this.middle + 1],
    ];
    this.snakeBody = [''];
    this.direction = 'E';
    this.score = 0;
    this.firstStart = false;
    this.toggleCard = false;
    this.autoMove = setInterval(async () => {
      await this.snakeGo(this.direction);
    }, 100);
  }
  initCod = 39;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (!this.isBusy) {
      this.isBusy = true;
      if (this.initCod === event.keyCode) {
        this.snakeGo(this.direction);
      }
      this.initCod = event.keyCode;

      if (event.keyCode === 39) {
        if (this.direction !== 'W') {
          this.direction = 'E';
        }
      }
      if (event.keyCode === 37) {
        if (this.direction !== 'E') {
          this.direction = 'W';
        }
      }
      if (event.keyCode === 38) {
        if (this.direction !== 'S') {
          this.direction = 'N';
        }
      }
      if (event.keyCode === 40) {
        if (this.direction !== 'N') {
          this.direction = 'S';
        }
      }

      if (event.keyCode === 32) {
        this.ngOnDestroy();
      }
    }
  }
}
