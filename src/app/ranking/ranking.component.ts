import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Input()
  newScore: number = 0;
  ngOnChanges(changes: SimpleChanges) {
    if (this.newScore > 0 && this.newScore > this.myScore) {
      this.updateScore();
      console.log('change value', this.newScore);
      this.myScore = this.newScore;
    }
  }
  dbGameName = this.router.url.substring(1);
  scores: any;
  myScore: any;
  userId: number = 0;
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
      this.scores = data;
    });
  }

  // to each game
  fetchScores() {
    this.webReqService.get('/scores/' + this.dbGameName).subscribe((data) => {
      this.scores = data;
    });
  }

  fetchMyScore() {
    const user = JSON.parse(
      sessionStorage.getItem('user') || '{"name": " ", "avatar": " "}'
    );
    this.userId = user.id;
    this.webReqService
      .get('/scores/' + this.dbGameName + '/' + user.id)
      .subscribe((data) => {
        this.myScore = data;
        if (this.myScore[0]) {
          this.myScore = this.myScore[0].score;
        }
      });
  }

  updateScore() {
    this.webReqService
      .post('/scores/' + this.dbGameName + '/' + this.userId, {
        score: this.newScore,
        gameName: this.dbGameName,
        userId: this.userId,
      })
      .subscribe((data) => {
        console.log('upadate score', data);
        if (data) {
          this.fetchScores();
        }
      });
  }
}
