import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = 'https://www.microsoft.com/fr-fr/store/top-paid/games/pc';
    window.open(url, '_blank');
    this.router.navigate(['./home']);
  }
}
