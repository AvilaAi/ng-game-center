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
  constructor() {}

  ngOnInit(): void {
    for (var a = [], i = 0; i < this.numbers.length; ++i) {
      a[i] = i + 1;
      this.grid[i] = new Array(9).fill(0);
    }
    this.initThreeCase(0, 0);
    this.initThreeCase(3, 3);
    this.initThreeCase(6, 6);
    this.solve(this.grid);

    this.randomEspace(30);
    console.log(this.hiddenCase);
  }

  randomEspace(level: number) {
    console.log(
      JSON.stringify(this.gridToComplete) === JSON.stringify(this.grid)
    );
    for (let index = 0; index < level; index++) {
      var randomY = Math.floor(Math.random() * 9);
      var randomX = Math.floor(Math.random() * 9);
      var toHidden = randomY + '-' + randomX;
      if (this.hiddenCase.indexOf(toHidden) < 0) {
        this.hiddenCase.push(toHidden);
        this.gridToComplete[randomY][randomX] = 0;
      }
    }
    console.log('this.gridToComplete', this.gridToComplete);
    console.log('grid', this.grid);
  }

  initThreeCase(x: number, y: number) {
    for (var a = [], i = 0; i < this.numbers.length; ++i) {
      a[i] = i + 1;
    }
    var random = this.shuffle(a);
    var r = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.grid[y + i][x + j] = random[r];
        r += 1;
      }
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
}
