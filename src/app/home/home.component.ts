import { Component, OnInit } from '@angular/core';
import { games } from '../global';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
loading=true
games:any=[]
classicGames:any=[]
newGames:any=[]
  ngOnInit(): void {
    this.games = games;
    this.newGames=this.games.filter((x:any) => x.isNew );
    this.classicGames=this.games.filter((x:any) => !x.isNew );

    setTimeout(() => { this.loading=false},800)
   
  }

}
