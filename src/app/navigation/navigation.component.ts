import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public user: any;
  nameCapitalize = '';
  
  constructor(private router: Router,) {
    this.user = JSON.parse(
      sessionStorage.getItem('user') || '{"name": " ", "avatar": " "}'
    );
    this.nameCapitalize =
      this.user.name[0].toUpperCase() + this.user.name.slice(1);
  }

  ngOnInit(): void {
    this.user = JSON.parse(
      sessionStorage.getItem('user') || '{"name": "", "avatar": ""}'
    );

  }
  // ngDoCheck() {
  //   this.user = JSON.parse(
  //     sessionStorage.getItem('user') || '{"name": "", "avatar": ""}'
  //   );
  // }
  components = [
    { name: 'home', emoji: '🏠', link: '/home-component' },
    { name: 'snake', emoji: '🐍', link: '/snake-component' },
    { name: 'tic-tac-toe', emoji: '⭕', link: '/tictac-component' },
    { name: 'cards', emoji: '🃏', link: '/card-component' },
    { name: 'bird', emoji: '🐤', link: '/bird-component' },
    { name: 'piano', emoji: '🎹', link: '/piano-component' },
  ];

  isCollapsed = true;
  isPopup = false;
  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/'])
  }
}
