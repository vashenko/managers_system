import { Injectable } from '@angular/core';
import {Observer, Observable} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {google} from 'google-maps';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  geocoder: any;
  showMark = false;
  constructor(private googleMapsAPi: MapsAPILoader) { }

  static changeZoom(types: string[], map: any) {
    types.forEach(i => {
      if (i === 'premise' || i === 'street_address' || i === 'route') {
        map.setZoom(18);
      } else if (i === 'locality') {
        map.setZoom(8);
        console.log(map.getZoom());
      } else if (i === 'country') {
        console.log('i am here');
        map.setZoom(4);
      }
    });
  }

 static deleteSymbolInAdress(adress: string): string {
    return adress.includes('№') ? adress.replace('№', '') : adress;
  }

  showOnMap(adress: string, mark: Object, map: any) {
    this.googleMapsAPi.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.codeAddress(GoogleMapsService.deleteSymbolInAdress(adress)).subscribe(res => {
        mark['lat'] = res[0].geometry.location.lat();
        mark['lng'] = res[0].geometry.location.lng();
        console.log(res);
        console.log(mark['lat']);
        console.log(mark['lng']);
        console.log(res[0].formatted_address);
        GoogleMapsService.changeZoom(res[0].types, map);
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

  replaceMarker(event: any, mark: Object): void {
    mark['lat'] = event.coords.lat;
    mark['lng'] = event.coords.lng;
  }

}
