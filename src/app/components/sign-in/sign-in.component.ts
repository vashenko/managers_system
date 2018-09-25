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
    this.initControls();
    this.initForm();
    if (this.authService.authenticated) {
      this.router.navigate(['/managers']);
    }
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

  // signIn() {
  //   if (this.logInForm.valid) {
  //     this.authService.signInWithEmailAndPassword(this.logInEmail.value, this.logInPassword.value)
  //       .then(() => this.router.navigate(['/managers']))
  //       .catch(err => {
  //         this.error = err.message;
  //         setTimeout(() => {
  //           this.error = '';
  //         }, 5500);
  //       });
  //   }
  // }

  signIn() {
    if (this.logInForm.valid) {
      let token: string;
      this.httpService.sendUserCredentials(this.logInEmail.value, this.logInPassword.value).subscribe(res => {
        token = res;
        this.authService.signInWithCustomToken(token)
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
