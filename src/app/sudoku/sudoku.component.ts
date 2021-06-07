import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
})
export class SudokuComponent implements OnInit {
  numbers = Array(9);
  grid = [
    [0, 0, 6, 0, 3, 0, 7, 0, 0],
    [0, 3, 0, 5, 0, 8, 0, 9, 0],
    [8, 0, 0, 4, 0, 7, 0, 0, 6],
    [0, 9, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 0, 8, 2, 9, 0, 0, 0],
    [0, 6, 0, 0, 0, 0, 0, 2, 0],
    [3, 0, 0, 6, 0, 4, 0, 0, 9],
    [0, 4, 0, 2, 0, 1, 0, 8, 0],
    [0, 0, 1, 0, 5, 0, 2, 0, 0],
  ];
  firstCase = [];
  constructor() {}
  allNumbers: number[][] = [[]];
  ngOnInit(): void {
    for (var a = [], i = 0; i < this.numbers.length; ++i) {
      a[i] = i + 1;
      this.grid[i] = new Array(9).fill(0);
    }

    this.firstCase = this.shuffle(a);
    this.allNumbers[0] = this.firstCase;
    // this.generateNumber(1);
    console.log(`this.grid`, this.grid);
    // this.solve(this.grid);
  }

  generateNumber(indexCase: number) {
    var random = this.shuffle([...this.firstCase]);
    var newCase = [];
    console.log(`random`, random);
    var preCaseX = this.allNumbers[indexCase - 1];
    var preCaseY;
    if (indexCase !== (1 || 3 || 8)) {
      preCaseX = [...preCaseX].concat(this.allNumbers[indexCase - 2]);
    }
    if (indexCase > 5) {
      preCaseY = this.allNumbers[indexCase - 3].concat(
        this.allNumbers[indexCase - 6]
      );
    } else if (indexCase > 2) {
      preCaseY = this.allNumbers[indexCase - 3];
    }
    for (let i = 0; i < 8; i++) {
      var preX: number[] = [];
      var preY: number[] = [];

      if (i < 3) {
        preX = preCaseX.slice(0, 3).concat(preCaseX.slice(9, 12));
      } else if (i < 6) {
        preX = preCaseX.slice(3, 6).concat(preCaseX.slice(12, 15));
      } else {
        preX = preCaseX.slice(6, 9).concat(preCaseX.slice(15, 18));
      }
      var num = random.find((n: number) => preX.indexOf(n) < 0);
      if (!num) {
        this.generateNumber(1);
        break;
      }
      newCase.push(num);
      console.log(`num`, num);
      console.log(`preX`, preX);
      const indexOfNum = random.indexOf(num);
      random.splice(indexOfNum, 1);

      this.allNumbers[indexCase] = [...newCase];
    }
    console.log(`this.allNumbers[0]`, this.allNumbers[0]);
    console.log('generate', this.allNumbers[indexCase]);
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
  solution = 0;

  solve(grid: number[][]) {
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
    // console.log(`grid`, [...grid]);

    console.log(`this.solution`, this.solution);
  }
}
