import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpService} from '../../services/http.service';
import {AngularFireAuth} from '@angular/fire/auth';

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

  constructor(private router: Router, private authService: AuthService, private httpService: HttpService,
              private fireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.initControls();
    this.initForm();
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/managers']);
      }
    });
  }

  initForm() {
    this.logInForm = new FormGroup({
      'email': this.logInEmail,
      'password': this.logInPassword
    });
  }

  initControls() {
    this.logInEmail = new FormControl('');
      // [Validators.required,
      //                Validators.pattern("^[a-z0-9](\\.?[a-z0-9]){5,}@kt\\.ua$")]);
    this.logInPassword = new FormControl('', [Validators.required, Validators.minLength(1)]);
  }

  signIn() {
    if (this.logInForm.valid) {
      let serverToken: string;
      this.httpService.sendUserCredentials(this.logInEmail.value, this.logInPassword.value).subscribe(res => {
        serverToken = res;
        this.authService.signInWithCustomToken(serverToken)
          .then(() => this.router.navigate(['/managers']))
          .catch(err => {
            this.error = err.message;
            setTimeout(() => {
              this.error = '';
            }, 5500);
          });
      }, err => {
        this.error = err.error;
        setTimeout(() => {
          this.error = '';
        }, 5500);
      });
    }
  }
}
