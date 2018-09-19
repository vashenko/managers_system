import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ManagerComponent } from './components/manager/manager.component';

import {FirebaseService} from './services/firebase.service';
import {SocialAuthService} from './services/social-auth.service';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment.prod';
import { ManagersListComponent } from './components/managers-list/managers-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RouterModule, Routes} from '@angular/router';
import { OrderedProductsConvertorPipe} from './pipes/array-convertor.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';
import {HttpService} from './services/http.service';

import { HttpClientModule} from '@angular/common/http';
import {ConvertService} from './services/convert.service';
import {ManagerService} from './services/manager-service.service';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', component: SignInComponent},
  { path: 'managers', component: ManagersListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    ManagersListComponent,
    SignInComponent,
    NavbarComponent,
    OrderedProductsConvertorPipe
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule

  ],
  providers: [FirebaseService, SocialAuthService, HttpService, ConvertService, ManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
