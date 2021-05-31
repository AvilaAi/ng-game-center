import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("user")){
      this.router.navigate(['./home-component']);
    }
  }

  onSubmit(f: NgForm) {
    sessionStorage.setItem('user', JSON.stringify(f.value) || '{"name": "", "avatar": ""}');
    this.router.navigate(['./home-component']);
  }

  avatars = ['👧', '👦', '👽', '👻'];
}
