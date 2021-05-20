import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public user: any;
  constructor() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }
  ngDoCheck() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
  }
}
