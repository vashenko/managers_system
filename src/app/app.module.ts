import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment.prod';

import { SubdivisionsListComponent} from './components/subdivisions-list/subdivisions-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { DirectionTableComponent} from './components/direction-table/direction-table.component';

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

import {DevExtremeModule, DxDataGridModule, DxPieChartModule, DxTemplateModule} from 'devextreme-angular';
import {SubdivisionService} from './services/subdivision.service';
import {PagerService} from './services/pager.service';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { SubdivisionsManagersComponent } from './components/subdivisions-managers/subdivisions-managers.component';

const routes: Routes = [
  { path: 'log-in', component: SignInComponent},
  { path: 'graphics', component: GraphicsComponent, canActivate: [FirebaseAuthGuard]},
  { path: 'subdivisions', component: SubdivisionsListComponent, canActivate: [FirebaseAuthGuard]},
  { path: 'direction_table', component: DirectionTableComponent, canActivate: [FirebaseAuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    SubdivisionsListComponent,
    SignInComponent,
    NavbarComponent,
    DirectionTableComponent,
    GraphicsComponent,
    SubdivisionsManagersComponent
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
    ReactiveFormsModule,
    DevExtremeModule,
    DxDataGridModule,
    DxTemplateModule,
    DxPieChartModule
  ],
  providers: [HttpService, ConvertService, ManagerService, DateService, AuthService, FirebaseAuthGuard, SubdivisionService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
