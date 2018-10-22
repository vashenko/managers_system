import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsMapsComponent} from './clients-maps.component';
import {GoogleMapModule} from '../../../modules/shared/google-map.module';
import {GoogleMapWrapperModule} from '../google-map-wrapper/google-map-wrapper.module';
import {GoogleMapsService} from '../../../services/google-maps.service';
import {ClientsMapRouting} from './clients-map-routing';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapModule,
    GoogleMapWrapperModule,
    ClientsMapRouting
  ],
  declarations: [
    ClientsMapsComponent
  ],
  exports: [
    ClientsMapsComponent,
    GoogleMapWrapperModule,
    ClientsMapRouting
  ],
  providers: [
    GoogleMapsService
  ]
})

export class ClientsMapsModule { }
