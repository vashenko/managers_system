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
import { TreeComponent } from './components/tree/tree.component';

import { GroupByPipe } from './pipes/group-by.pipe';
import {GetClientsPipe} from './pipes/get-clients';
import { GetOrdersPipe } from './pipes/get-orders.pipe';

import {DevExtremeModule, DxDataGridModule, DxTemplateModule} from 'devextreme-angular';

const routes: Routes = [
  { path: '', redirectTo: 'direction', pathMatch: 'full' },
  { path: 'log-in', component: SignInComponent},
  { path: 'direction', component: ManagersListComponent, canActivate: [FirebaseAuthGuard]},
  { path: 'direction_table', component: TreeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    ManagersListComponent,
    SignInComponent,
    NavbarComponent,
    GroupByPipe,
    GetClientsPipe,
    GetOrdersPipe,
    TreeComponent
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
    DxTemplateModule
  ],
  providers: [HttpService, ConvertService, ManagerService, DateService, AuthService, FirebaseAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
