import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment.prod';

import { SubdivisionsListComponent} from './components/subdivisions-list/subdivisions-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { SubdivisionsManagersComponent } from './components/subdivisions-managers/subdivisions-managers.component';

import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';
import { HttpClientModule} from '@angular/common/http';

import {HttpService} from './services/http.service';
import {ConvertService} from './services/convert.service';
import {ManagerService} from './services/manager.service';
import {DateService} from './services/date.service';
import {AuthService} from './services/auth.service';
import {PagerService} from './services/pager.service';
import {SubdivisionService} from './services/subdivision.service';
import {FirebaseAuthGuard} from './guards/firebase-auth.guard';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { GraphicsComponent } from './components/graphics/graphics.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignInComponent},
  { path: 'log-in', component: SignInComponent},
  { path: 'test', component: TestComponent},
  { path: 'graphics', component: GraphicsComponent, canActivate: [FirebaseAuthGuard]},
  { path: 'subdivisions', component: SubdivisionsListComponent, canActivate: [FirebaseAuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    SubdivisionsListComponent,
    SignInComponent,
    GraphicsComponent,
    SubdivisionsManagersComponent,
    NavbarComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB_sXuJ_dCkwGUOkAiwdOh7L8o94HIhaBw'
    }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [HttpService, ConvertService, ManagerService, DateService, AuthService, FirebaseAuthGuard, SubdivisionService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
