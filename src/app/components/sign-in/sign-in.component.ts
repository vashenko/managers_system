import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  private logInForm: FormGroup;
  private logInEmail: FormControl;
  private logInPassword: FormControl;
  error: string;

  constructor(private router: Router, private authService: AuthService, private httpService: HttpService) {
  }

  ngOnInit() {
    this.authService.checkOnLoggedUser();
    this.initControls();
    this.initForm();
  }

  initForm() {
    this.logInForm = new FormGroup({
      'email': this.logInEmail,
      'password': this.logInPassword
    });
  }

  initControls() {
    this.logInEmail = new FormControl('', [Validators.required]);
    this.logInPassword = new FormControl('', [Validators.required]);
  }

  errosHandler(err: string) {
    this.error = err;
    setTimeout(() => {
      this.error = '';
    }, 4500);
  }

  signIn() {
    if (this.logInForm.valid) {
      this.httpService.sendUserCredentials(this.logInEmail.value, this.logInPassword.value).subscribe(token => {
        this.authService.signInWithCustomToken(token)
          .then(() => {
            this.authService.getUserTokenId()
              .then((idToken) => localStorage.setItem('User', idToken));
          })
          .then(() => this.router.navigate(['/subdivisions']))
          .catch(err => this.errosHandler(err.message));
      },
    err => this.errosHandler(err.error));
    }
  }
}
