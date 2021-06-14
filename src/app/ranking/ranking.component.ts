import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';
import * as global from '../global';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Input() newScore: number = 0;
  avatars = global.avatars;
  games = global.games;
  ngOnChanges(changes: SimpleChanges) {
    if (this.user && this.newScore > 0 && this.newScore > this.myScore) {
      this.updateScore();
      console.log('change value', this.newScore);
      this.myScore = this.newScore;
    }
  }

  dbGameName = this.router.url.substring(1);
  scores: any;
  myScore: any;
  user: any;

  constructor(
    private router: Router,
    private webReqService: WebRequestService
  ) {}

  ngOnInit(): void {
    if (this.dbGameName === 'home') {
      this.getScores();
    } else {
      this.fetchScores();
      this.fetchMyScore();
    }
  }
  // to home page
  getScores() {
    this.webReqService.get('/game-scores').subscribe((data) => {
      var str = JSON.stringify(data);
      var arr = [...JSON.parse(str)];
      const gameScores = arr.map((e) => {
        const gameName = this.games.find((g) => g.dbName === e.gameName)?.name;
        const gameEmoji = this.games.find(
          (g) => g.dbName === e.gameName
        )?.emoji;
        const userAvatar = this.avatars.find((a) => a.name === e.avatar)?.value;
        return { ...e, gameName, avatar: userAvatar, gameEmoji };
      });

      this.scores = gameScores;
    });
  }

  // to each game
  fetchScores() {
    this.webReqService.get('/scores/' + this.dbGameName).subscribe((data) => {
      var str = JSON.stringify(data);
      var arr = [...JSON.parse(str)];
      const gameScores = arr.map((e) => {
        const userAvatar = this.avatars.find((a) => a.name === e.avatar)?.value;
        return { ...e, avatar: userAvatar };
      });
      this.scores = gameScores;
    });
  }

  fetchMyScore() {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      this.user = JSON.parse(sessionUser);

      this.webReqService
        .get('/scores/' + this.dbGameName + '/' + this.user.id)
        .subscribe((data) => {
          this.myScore = data;
          if (this.myScore[0]) {
            this.myScore = this.myScore[0].score;
          }
        });
    }
  }

  updateScore() {
    this.webReqService
      .post('/scores/' + this.dbGameName + '/' + this.user.id, {
        score: this.newScore,
        gameName: this.dbGameName,
        userId: this.user.id,
      })
      .subscribe((data) => {
        console.log('upadate score', data);
        if (data) {
          this.fetchScores();
        }
      });
  }
}
