import { Injectable } from '@angular/core';
import {Observer, Observable} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {google} from 'google-maps';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  geocoder: any;
  showMark: boolean;
  constructor(private googleMapsAPi: MapsAPILoader ) { }

  replaceMarker(event: any, mark: Object) {
    mark['lat'] = event.coords.lat;
    mark['lng'] = event.coords.lng;
  }

  showOnMap(adress: string, mark: Object) {
    this.googleMapsAPi.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.codeAddress(adress).subscribe(res => {
        mark['lat'] = res[0].geometry.location.lat();
        mark['lng'] = res[0].geometry.location.lng();
      });
    });
  }

  codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {
    return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
      this.geocoder.geocode({ address: address }, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.showMark = true;
            observer.next(results);
            observer.complete();
          } else {
            console.log(
              'Geocoding service: geocode was not successful for the following reason: '
              + status
            );
            this.showMark = false;
            observer.error(status);
          }
        })
      );
    });
  }
}
