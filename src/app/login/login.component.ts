import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    sessionStorage.setItem('user', JSON.stringify(f.value) || '');
    this.router.navigate(['./home-component']);
  }

  avatars = ['👧', '👦', '👽', '👻'];
}
