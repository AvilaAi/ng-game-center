import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tictac',
  templateUrl: './tictac.component.html',
  styleUrls: ['./tictac.component.scss'],
})
export class TictacComponent implements OnInit {
  constructor() {}

  title = 'Tic-Tac-Toe';
  numbers = [...Array(9).keys()];
  x = 'x';
  o = 'o';
  currentPlayer = this.x;
  winner = '';
  nulGame = 'Nul';
  occupX: number[] = [];
  occupO: number[] = [];
  spaceO = [...Array(9).keys()];
  endGame = false;
  score = 0;
  computerScore = 0;
  userAvatar = '';
  conditionWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winLine: number[] = [];

  ifWin(arr1: number[], arr2: number[]) {
    return arr1.every((elem) => arr2.includes(elem));
  }

  ngOnInit(): void {
    this.newGame();
    const user = JSON.parse(
      sessionStorage.getItem('user') || '{"name": "", "avatar": "You"}'
    );
    this.userAvatar = user.avatar;
  }

  newGame() {
    this.currentPlayer = this.x;
    this.occupX = [];
    this.occupO = [];
    this.spaceO = [...Array(9).keys()];
    this.endGame = false;
    this.winner = '';
    this.winLine = [];
  }

  drawX(id: number) {
    const index = this.numbers.indexOf(id);
    this.occupX.push(id);

    this.currentPlayer = this.o;

    if (this.occupX.length > 2) {
      for (var i = 0; i < this.conditionWin.length; i++) {
        if (this.ifWin(this.conditionWin[i], this.occupX) === true) {
          this.winner = this.x;
          this.score += 1;
          this.endGame = true;

          this.winLine = this.conditionWin[i];

          break;
        }
      }
    }

    !this.endGame &&
      setTimeout(() => {
        this.drawO(id);
      }, 400);
  }

  drawO(id: number) {
    const index = this.spaceO.indexOf(id);
    this.spaceO.splice(index, 1);
    if (this.spaceO.length === 0 && this.winner.length === 0) {
      this.winner = this.nulGame;
    }

    var newO;
    const random = Math.floor(Math.random() * this.spaceO.length);
    newO = this.spaceO[random];

    if (this.occupX.length >= 2) {
      for (var i = 0; i < this.conditionWin.length; i++) {
        var missing: number[] = [];
        var xInWinLine = this.occupX.filter((val) => {
          return this.conditionWin[i].indexOf(val) != -1;
        });

        if (xInWinLine.length === 2) {
          missing = this.conditionWin[i].filter(
            (item) =>
              this.occupX.indexOf(item) < 0 && this.occupO.indexOf(item) < 0
          );
        }
        if (missing[0]) {
          newO = missing[0];
          break;
        } else {
          continue;
        }
      }
    }

    this.occupO.push(newO);

    const indexO = this.spaceO.indexOf(newO);
    this.spaceO.splice(indexO, 1);

    for (var i = 0; i < this.conditionWin.length; i++) {
      if (this.ifWin(this.conditionWin[i], this.occupO) === true) {
        this.winner = this.o;
        this.computerScore += 1;
        this.endGame = true;
        this.winLine = this.conditionWin[i];

        break;
      }
    }
    this.currentPlayer = this.x;
  }
}
