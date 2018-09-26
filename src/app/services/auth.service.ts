import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;

  constructor(public fireAuth: AngularFireAuth, private router: Router) {
    this.fireAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
      return this.authenticated ? this.authState : null;
  }

  logOut(): void {
    this.fireAuth.auth.signOut();
    localStorage.clear();
    this.authState = null;
    this.router.navigate(['/log-in']);
  }

  signInWithCustomToken(token: string) {
    return this.fireAuth.auth.signInWithCustomToken(token);
  }

  getUserTokenId(): Promise<string> {
    return new Promise((resolve => {
      this.fireAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token: string) => {
            resolve(token);
          });
        }
      });
    }));
  }

}
