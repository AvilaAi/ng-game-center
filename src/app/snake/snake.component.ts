import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
})
export class SnakeComponent implements OnInit {
  title = 'Petit Snake ';
  numbers = Array(30);
  middle = this.numbers.length / 2;
  snake = [
    [this.middle, this.middle],
    [this.middle - 1, this.middle - 1],
  ];
  snakeBody = [''];
  direction = 'E';
  score = 0;

  firstStart = true;
  toggleCard = true;

  randomFruit(max: number) {
    const x = Math.floor(Math.random() * max);
    const y = Math.floor(Math.random() * max);
    return x + '-' + y;
  }
  fruit = this.randomFruit(this.numbers.length);

  toSnakeString = (x: number, y: number) => x + '-' + y;

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
      [this.middle, this.middle],
      [this.middle - 1, this.middle - 1],
    ];
    this.snakeBody = [''];
    this.direction = 'E';
    this.score = 0;
    this.firstStart = false;
    this.toggleCard = false;
    this.snakeGo(this.direction);
    this.autoMove = setInterval(() => {
      this.snakeGo(this.direction);
    }, 100);
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.keyCode === 39) {
      switch (this.direction) {
        case 'E':
          this.direction = 'S';
          break;
        case 'S':
          this.direction = 'W';
          break;
        case 'W':
          this.direction = 'N';

          break;
        case 'N':
          this.direction = 'E';
          break;

        default: {
          break;
        }
      }
    } else if (event.keyCode === 37) {
      switch (this.direction) {
        case 'E':
          this.direction = 'N';
          break;
        case 'N':
          this.direction = 'W';
          break;
        case 'W':
          this.direction = 'S';

          break;
        case 'S':
          this.direction = 'E';
          break;

        default: {
          break;
        }
      }
    } else if (event.keyCode === 38) {
      this.snakeGo(this.direction);
    } else if (event.keyCode === 32) {
      this.ngOnDestroy();
    }
  }
}
