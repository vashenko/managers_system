import { Injectable } from '@angular/core';
import {Observer, Observable} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {google} from 'google-maps';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  geocoder: any;
  showDestination = false;
  currentPosition: any;
  destination: any;
  constructor(private googleMapsAPi: MapsAPILoader) {
    this.getCurrentUserLcoation();
  }

  // static changeZoom(types: string[], map: any) {
  //   types.forEach(i => {
  //     if (i === 'premise' || i === 'street_address' || i === 'route') {
  //       map.setZoom(18);
  //     } else if (i === 'locality') {
  //       map.setZoom(8);
  //       console.log(map.getZoom());
  //     } else if (i === 'country') {
  //       console.log('i am here');
  //       map.setZoom(4);
  //     }
  //   });
  // }

 static deleteSymbolInAdress(adress: string): string {
    return adress.includes('№') ? adress.replace('№', '') : adress;
  }

  showOnMap(adress: string, map: any) {
    this.googleMapsAPi.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.codeAddress(GoogleMapsService.deleteSymbolInAdress(adress)).subscribe(res => {
        this.destination = {lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng() };
        console.log(this.destination.lat);
        console.log(this.destination.lng);
        console.log(res[0].formatted_address);
        map.setCenter({lat: this.destination.lat, lng: this.destination.lng});
        map.setZoom(8);
      });
    });
  }

  codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {
    return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
      this.geocoder.geocode({ address: address }, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.showDestination = true;
            observer.next(results);
            observer.complete();
          } else {
            console.log(
              'Geocoding service: geocode was not successful for the following reason: '
              + status
            );
            observer.error(status);
          }
        })
      );
    });
  }

  replaceMarker(event: any, mark: Object): void {
    mark['lat'] = event.coords.lat;
    mark['lng'] = event.coords.lng;
  }

  getCurrentUserLcoation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

}
