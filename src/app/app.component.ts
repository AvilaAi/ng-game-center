import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Game center';
  constructor(private router: Router) {}
  checkUserLogin() {
    let JSONInformation = JSON.parse(
      sessionStorage.getItem('user') || '{"name": "", "avatar": ""}'
    );
    if (
      (JSONInformation.name == '' || JSONInformation.avatar == '') &&
      this.router.url != '/'
    ) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    sessionStorage.removeItem('user');
    sessionStorage.setItem('user', '{"name": "Toto", "avatar": "👧"}');
  }
  ngDoCheck() {
    this.checkUserLogin();
  }
}
