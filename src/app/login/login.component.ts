import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,

    private webReqService: WebRequestService
  ) {}

  isNew = true;

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['./home-component']);
    }
  }

  signUp(payload: any) {
    this.webReqService.post('/users', payload).subscribe((response: any) => {
      console.log('in sign up ', typeof response, response);

      if (typeof response == 'number' && response > 0) {
        alert('user existe');
      } else {
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            name: payload.name,
            avatar: payload.avatar,
            id: payload.id,
          })
        );
        this.router.navigate(['./home-component']);
      }
    });
  }

  signIn(payload: any) {
    this.webReqService.post('/users', payload).subscribe((response: any) => {
      console.log('in sign  in', typeof response, response);
      if (!response) {
        alert('wrong user name or password');
      } else if (response.name && response.avatar) {
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            name: response.name,
            avatar: response.avatar,
            id: response.id,
          })
        );
        this.router.navigate(['./home-component']);
      }
    });
  }

  onSubmit(f: NgForm) {
    if (this.isNew) {
      this.signUp(f.value);
    } else {
      this.signIn(f.value);
    }
  }

  avatars = ['👧', '👦', '👽', '👻'];
}
