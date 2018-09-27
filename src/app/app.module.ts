import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment.prod';

import { ManagersListComponent } from './components/managers-list/managers-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { ManagerComponent } from './components/manager/manager.component';

import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';
import { HttpClientModule} from '@angular/common/http';

import {HttpService} from './services/http.service';
import {ConvertService} from './services/convert.service';
import {ManagerService} from './services/manager.service';
import {DateService} from './services/date.service';
import {AuthService} from './services/auth.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FirebaseAuthGuard} from './guards/firebase-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'managers', pathMatch: 'full' },
  { path: 'log-in', component: SignInComponent},
  { path: 'managers', component: ManagersListComponent, canActivate: [FirebaseAuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    ManagersListComponent,
    SignInComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [HttpService, ConvertService, ManagerService, DateService, AuthService, FirebaseAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
