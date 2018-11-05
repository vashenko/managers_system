import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpService} from '../../services/http.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  public logInForm: FormGroup;
  public logInEmail: FormControl;
  public logInPassword: FormControl;
  public error: string;

  constructor(private router: Router, private authService: AuthService, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.authService.checkOnLoggedUser();
    this.initControls();
    this.initForm();
  }

  private initForm(): void {
    this.logInForm = new FormGroup({
      'email': this.logInEmail,
      'password': this.logInPassword
    });
  }

  private initControls(): void {
    this.logInEmail = new FormControl('', [Validators.required]);
    this.logInPassword = new FormControl('', [Validators.required]);
  }

  private errosHandler(err: string): void {
    this.error = err;
    setTimeout(() => {
      this.error = '';
    }, 4500);
  }

  public signIn(): void {
    if (this.logInForm.valid) {
      this.httpService.sendUserCredentials(this.logInEmail.value, this.logInPassword.value).pipe(
        takeUntil(componentDestroyed(this))).subscribe(token => {
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

  ngOnDestroy() {

  }
}
