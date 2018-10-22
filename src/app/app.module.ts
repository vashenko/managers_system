import { NgModule } from '@angular/core';
import {CoreModule} from './modules/core.module';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {HttpService} from './services/http.service';
import {ConvertService} from './services/convert.service';
import {AuthService} from './services/auth.service';
import {FirebaseAuthGuard} from './guards/firebase-auth.guard';

import {RoutingModule} from './modules/routing.module';
import {FirebaseModule} from './modules/firebase.module';
import { MaterialModule } from './modules/shared/material.module.';
import {ClientsMapsModule} from './components/google-map/clients-maps/clients-maps.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    GraphicsComponent,
    NavbarComponent,
  ],
  imports: [
    FirebaseModule,
    RoutingModule,
    MaterialModule,
    CoreModule,
    ClientsMapsModule,
  ],
  providers: [HttpService, ConvertService, AuthService, FirebaseAuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
