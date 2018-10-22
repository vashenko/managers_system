import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import UserCredential = firebase.auth.UserCredential;

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

  public get authenticated(): boolean {
    return this.authState !== null;
  }

  public get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  public logOut(): void {
    this.fireAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('User');
        this.router.navigate(['/log-in']);
      });
  }

  public signInWithCustomToken(token: string): Promise<UserCredential> {
    return this.fireAuth.auth.signInWithCustomToken(token);
  }

  public getUserTokenId(): Promise<string> {
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

  public checkOnLoggedUser(): void {
    setTimeout(() => {
      this.fireAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.router.navigate(['/subdivisions']);
        }
      });
    }, 1000);
  }

}

