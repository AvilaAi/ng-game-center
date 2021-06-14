import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { games } from '../global';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public user: any;

  constructor(private router: Router) {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      this.user = JSON.parse(sessionUser);
    }
  }

  ngOnInit(): void {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      this.user = JSON.parse(sessionUser);
    }
  }
  // ngDoCheck() {
  //   this.user = JSON.parse(
  //     sessionStorage.getItem('user') || '{"name": "", "avatar": ""}'
  //   );
  // }

  components = [
    {
      name: 'home',
      emoji: '🏠',

      photo: '',
      isNew: false,
      dbName: 'home',
    },
    ...games,
  ];

  isCollapsed = true;
  isPopup = false;
  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
