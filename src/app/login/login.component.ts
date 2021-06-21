import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';
import { avatars } from '../global';
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
  avatars = avatars;
  showPassword = false;
  existeAlert = '';
  errorAlert = '';
  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['./home']);
    }
  }

  signUp(payload: any) {
    this.webReqService.post('/users', payload).subscribe((response: any) => {

      if (typeof response == 'number' && response > 0) {
        this.existeAlert = '*username existe';
      } else {
        const avatar = this.avatars.find((e) => e.name === payload.avatar);
        const userId = response[0][0].id;
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            name: payload.name,
            avatar: avatar ? avatar.value : '',
            id: userId,
          })
        );
        this.router.navigate(['./home']);
      }
    });
  }

  signIn(payload: any) {
    this.webReqService.post('/users', payload).subscribe((response: any) => {
      console.log('in sign  in', typeof response, response);
      if (!response) {
        this.errorAlert = '*wrong user name or password';
      } else if (response.name && response.avatar) {
        const avatar = this.avatars.find((e) => e.name === response.avatar);

        sessionStorage.setItem(
          'user',
          JSON.stringify({
            name: response.name,
            avatar: avatar ? avatar.value : '',
            id: response.id,
          })
        );
        this.router.navigate(['./home']);
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
}
