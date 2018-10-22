import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsMapsComponent} from './clients-maps.component';
import {GoogleMapModule} from '../../../modules/shared/google-map.module';
import {GoogleMapWrapperModule} from '../google-map-wrapper/google-map-wrapper.module';
import {GoogleMapsService} from '../../../services/google-maps.service';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapModule,
    GoogleMapWrapperModule,
  ],
  declarations: [
    ClientsMapsComponent
  ],
  exports: [
    ClientsMapsComponent,
    GoogleMapWrapperModule
  ],
  providers: [
    GoogleMapsService
  ]
})

export class ClientsMapsModule { }
