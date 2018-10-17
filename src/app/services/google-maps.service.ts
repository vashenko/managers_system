import { Injectable } from '@angular/core';
import {Observer, Observable, BehaviorSubject} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {google} from 'google-maps';
import {Mark} from '../domains/google-mark.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private markerDataChange: BehaviorSubject<Mark> = new BehaviorSubject<Mark>( new Mark(48.379433, 31.16557990000001));
  private geocoder: any;
  private map: any;

  public showMark = false;
  public mark: Mark;

  constructor(private googleMapsAPi: MapsAPILoader) {
    this.markerDataChange.subscribe(res => {
      this.mark = res;
    });
  }

  static changeZoom(types: string[], map) {
    types.forEach(i => {
      if (i === 'premise' || i === 'street_address' || i === 'route') {
        map.setZoom(18);
      } else if (i === 'locality') {
        map.setZoom(8);
      } else if (i === 'country') {
        console.log('i am here');
        map.setZoom(4);
      }
    });
  }

  static deleteSymbolInAdress(adress: string): string {
    return adress.includes('№') ? adress.replace('№', '') : adress;
  }

  changeMarksLatAndLng(res: any) {
    this.markerDataChange.next(new Mark(res.coords.lat, res.coords.lng));
  }

  initMap(map) {
    this.googleMapsAPi.load().then(() => {
      this.map = map;
    });
  }

  showOnMap(adress: string, node: HTMLDivElement): void {
    this.googleMapsAPi.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.codeAddress(GoogleMapsService.deleteSymbolInAdress(adress)).subscribe(res => {
        this.markerDataChange.next(
          new Mark(res[0].geometry.location.lat(), res[0].geometry.location.lng())
        );
        this.initGoogleStreetView(node);
        GoogleMapsService.changeZoom(res[0].types, this.map);
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

  initGoogleStreetView(node: HTMLDivElement): void {
    const options = {
      position: this.mark,
      pov: {heading: 165, pitch: 0},
      zoom: 1
    };
    const panorama = new google.maps.StreetViewPanorama(node, options);
  }

  replaceMarkerByDragging(event: any, node: HTMLDivElement): void {
      this.changeMarksLatAndLng(event);
      this.initGoogleStreetView(node);
  }

  replaceMarkerByClicking(event: any, node: HTMLDivElement) {
      this.showMark = true;
      this.changeMarksLatAndLng(event);
      this.initGoogleStreetView(node);
  }

}
