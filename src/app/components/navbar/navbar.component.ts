import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{
  currentUserName: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    if (this.authService.authenticated) {
      this.currentUserName = this.authService.currentUser.displayName;
    }
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}


// <a  [routerLink]="['/log-in']" *ngIf="!this.authService.authenticated">Sign In</a>
// <a  mat-list-item class="anchorNavItem" [routerLink]="['/subdivisions']">Subdivisions</a>
//   <a  mat-list-item class="anchorNavItem" [routerLink]="['/graphics']">Graphics</a>
//   <a  mat-list-item class="anchorNavItem" (click)="logOut()" *ngIf="this.authService.authenticated">Log Out</a>
// <a  mat-list-item class="anchorNavItem" *ngIf="currentUserName"><h4>Hello {{this.currentUserName}}</h4></a>
