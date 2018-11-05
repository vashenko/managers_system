import {Injectable} from '@angular/core';
import {Observer, Observable, BehaviorSubject, Subscription} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {google} from 'google-maps';
import {Mark} from '../domains/google-mark.model';
import StreetViewPanorama = google.maps.StreetViewPanorama;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private markerDataChange: BehaviorSubject<Mark> = new BehaviorSubject<Mark>( new Mark(48.379433, 31.16557990000001));
  private streetViewChange: BehaviorSubject<StreetViewPanorama> = new BehaviorSubject<StreetViewPanorama>(null);
  private geocodingResult: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private geocoder: any;
  private googleMapWrapper: any;
  private mark: Mark;

  constructor(public googleMapsAPi: MapsAPILoader) {
    this.markerDataChange.subscribe(mark => {
      this.mark = mark;
    });
  }

  static changeZoom(types: string[], map): void {
    types.forEach(i => {
      if (i === 'premise' || i === 'street_address' || i === 'route') {
        map.setZoom(18);
      } else if (i === 'locality') {
        map.setZoom(8);
      } else if (i === 'country') {
        map.setZoom(4);
      }
    });
  }

  private deleteSymbolInAdress(adress: string): string {
    return adress.includes('№') ? adress.replace('№', '') : adress;
  }

  private changeMarksLatAndLng(res: any): void {
    this.markerDataChange.next(new Mark(res.coords.lat, res.coords.lng));
  }

  private sendClientLatAndLng(mark: Mark): void {
    console.log(mark.lng);
    console.log(mark.lat);
  }

  public initMap(googleMapWrapper): void {
    this.googleMapsAPi.load().then(() => {
      this.googleMapWrapper = googleMapWrapper;
    });
  }

  public showOnMap(adress: string, node: HTMLDivElement): void {
    this.googleMapsAPi.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
        this.codeAddress(this.deleteSymbolInAdress(adress)).subscribe(res => {
          this.markerDataChange.next(
            new Mark(res[0].geometry.location.lat(), res[0].geometry.location.lng())
          );
          this.sendClientLatAndLng(this.mark);
          this.initGoogleStreetView(node);
          GoogleMapsService.changeZoom(res[0].types, this.googleMapWrapper);
        });
    });
  }

  public codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {
    return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
      this.geocoder.geocode({ address: address }, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.geocodingResult.next(true);
            observer.next(results);
            observer.complete();
          } else {
            console.log(
              'Geocoding service: geocode was not successful for the following reason: '
              + status
            );
            this.geocodingResult.next(false);
            observer.error(status);
          }
        })
      );
    });
  }

  private initGoogleStreetView(node: HTMLDivElement): void {
    const options = {
      position: this.mark,
      pov: {heading: 165, pitch: 0},
      zoom: 1
    };
    this.streetViewChange.next(new google.maps.StreetViewPanorama(node, options));
  }

  public replaceMark(event: any, node: HTMLDivElement): void {
    this.geocodingResult.next(true);
    this.changeMarksLatAndLng(event);
    this.initGoogleStreetView(node);
  }

  public getMarkLatLang(): Observable<Mark> {
    return this.markerDataChange.asObservable();
  }

  public getGeocodingResult(): Observable<boolean> {
    return this.geocodingResult.asObservable();
  }

}

