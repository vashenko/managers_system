import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {User} from '../../domains/user.model';

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

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.authenticated) {
      this.router.navigate(['/managers']);
    }
  }

  ngOnInit() {
    this.initControls();
    this.initForm();
    console.log(this.authService.authenticated);
  }

  initForm() {
    this.logInForm = new FormGroup({
      'email': this.logInEmail,
      'password': this.logInPassword
    });
  }

  initControls() {
    this.logInEmail = new FormControl('',
      [Validators.required,
                     Validators.pattern("^[a-z0-9](\\.?[a-z0-9]){5,}@g(oogle)?mail\\.com$")]);
    this.logInPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  signIn() {
    if (this.logInForm.valid) {
      this.authService.signInWithEmailAndPassword(this.logInEmail.value, this.logInPassword.value)
        .then(() => this.router.navigate(['/managers']))
        .catch(err => {
          this.error = err.message;
          setTimeout(() => {
            this.error = '';
          }, 5500);
        });
    }
  }
}
