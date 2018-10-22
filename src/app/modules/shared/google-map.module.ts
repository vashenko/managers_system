import { NgModule } from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB_sXuJ_dCkwGUOkAiwdOh7L8o94HIhaBw',
      language: 'uk'
    }),
    AgmCoreModule,
    AgmDirectionModule,
  ],
  exports: [
    AgmCoreModule,
    AgmDirectionModule,
  ],
  providers: [
    GoogleMapsAPIWrapper
  ]
})
export class GoogleMapModule { }
