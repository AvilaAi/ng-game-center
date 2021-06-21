import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
})
export class SudokuComponent implements OnInit {
  numbers = Array(9);
  solution = 0;

  grid: number[][] = [[]];
  gridToComplete: number[][] = [[]];
  hiddenCase: string[] = [];
  levels = [
    { name: 'easy', time: 90, value: 10, life: 1 },
    { name: 'medium', time: 240, value: 40, life: 2 },
    { name: 'hard', time: 480, value: 60, life: 3 },
  ];
  level = this.levels[0];
  holes = 10;
  life = 1;
  time = 90;
  timeToDisplay = 0;
  score = 0;
  isActive = '';
  gameOver = true;
  isFirstStart = true;
  minute =
    Math.trunc(this.time / 60) +
    ':' +
    (this.time - Math.trunc(this.time / 60) * 60);
  message = 'Click on the empty case, than choose the correct number';
  constructor() {}

  ngOnInit(): void {
    this.createGrid();
  }
  countDown = setTimeout(() => {}, 1000);
  ngOnDestroy() {
    this.gameOver = true;
    if (this.countDown) {
      clearInterval(this.countDown);
    }
  }
  reStart() {
    this.ngOnDestroy();
    this.createGrid();
  }
  clickStart() {
    this.isFirstStart = false;
    this.gameOver = false;
    this.time = this.level.time;
    this.life = this.level.life;
    this.cleanHoles();
    this.countDown = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        this.message = "Time's out! Restart a new game!";
        this.ngOnDestroy();
      }
    }, 1000);
  }
  createGrid() {
    this.solution = 0;
    this.grid = [[]];
    this.gridToComplete = [[]];
    this.hiddenCase = [];
    for (var a = [], i = 0; i < this.numbers.length; ++i) {
      a[i] = i + 1;
      this.grid[i] = new Array(9).fill(0);
    }
    this.initThreeCase();
    this.solve(this.grid);
    this.randomHoles(this.level.value);
  }

  changeLevel(level: any) {
    this.level = level;
    this.life = level.life;
    this.time = level.time;
    this.createGrid();
  }

  randomHoles(holes: number) {
    var randomY = 0;
    var randomX = 0;
    var i = 0;
    do {
      var randomY = Math.floor(Math.random() * 9);
      var randomX = Math.floor(Math.random() * 9);
      var toHidden = randomY + '-' + randomX;
      if (this.hiddenCase.indexOf(toHidden) < 0) {
        this.hiddenCase.push(toHidden);
        this.gridToComplete[randomY][randomX] = 0;
        i += 1;
      }
    } while (i < holes);
  }
  cleanHoles() {
    this.hiddenCase.forEach((h) => {
      const y = parseInt(h.slice(0, 1));
      const x = parseInt(h.slice(-1));
      this.gridToComplete[y][x] = 0;
    });
  }
  initThreeCase() {
    var startPoint = [0, 3, 6];
    startPoint.forEach((p) => {
      for (var a = [], i = 0; i < this.numbers.length; ++i) {
        a[i] = i + 1;
      }
      var random = this.shuffle(a);
      var r = 0;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.grid[p + i][p + j] = random[r];
          r += 1;
        }
      }
    });
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

  possible(grid: number[][], y: number, x: number, n: number) {
    for (let i = 0; i < 9; i++) {
      if (grid[y][i] === n) {
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (grid[i][x] === n) {
        return false;
      }
    }
    var x0 = Math.floor(x / 3) * 3;
    var y0 = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[y0 + i][x0 + j] === n) {
          return false;
        }
      }
    }

    return true;
  }

  solve(grid: number[][]) {
    if (this.solution > 0) {
      return;
    }
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (grid[y][x] === 0) {
          for (let n = 1; n < 10; n++) {
            if (this.possible(grid, y, x, n)) {
              grid[y][x] = n;
              this.solve(grid);
              grid[y][x] = 0;
            }
          }
          return;
        }
      }
    }

    this.solution += 1;

    this.grid = JSON.parse(JSON.stringify(this.grid));
    this.gridToComplete = JSON.parse(JSON.stringify(this.grid));
  }

  clickToInput(y: number, x: number) {
    this.isActive = y + '-' + x;
  }

  selectNumber(n: number) {
    if (this.isActive.length > 0) {
      const y = JSON.parse(this.isActive[0]);
      const x = JSON.parse(this.isActive[2]);
      this.gridToComplete[y][x] = n;

      if (this.grid[y][x] !== n) {
        this.life -= 1;
      }
    }
    if (JSON.stringify(this.grid) === JSON.stringify(this.gridToComplete)) {
      this.ngOnDestroy();
      this.score = this.time - 1;
      this.message = 'Bravo! 🏆' + this.score;
    }
    if (this.life < 0) {
      this.ngOnDestroy();
      this.message = "Life's out! Restart a new game!";
      this.life = 0;
    }
  }
}
