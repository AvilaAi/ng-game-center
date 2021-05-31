import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public user: any;
  constructor() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{"name": "", "avatar": ""}');
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{"name": "", "avatar": ""}');
  }
  ngDoCheck() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{"name": "", "avatar": ""}');
  }
  components = [
    { name: 'home', emoji: '🏠', link: '/home-component' },
    { name: 'snake', emoji: '🐍', link: '/snake-component' },
    { name: 'tic-tac-toe', emoji: '⭕', link: '/tictac-component' },
    { name: 'cards', emoji: '🃏', link: '/card-component' },
    { name: 'bird', emoji: '🐤', link: '/bird-component' },
    { name: 'piano', emoji: '🎹', link: '/piano-component' },
  ];

  isCollapsed = true;
}
