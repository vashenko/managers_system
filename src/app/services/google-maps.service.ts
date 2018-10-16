import {ElementRef, Injectable} from '@angular/core';
import {Observer, Observable} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {google} from 'google-maps';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private directionsService: google.maps.DirectionsService;
  private directionsDisplay: google.maps.DirectionsRenderer;
  // private googleStreetView: google.maps.StreetViewPanorama;
  private origin: object;
  private destination: any;

  private map: any;
  private geocoder: any;
  private showDestination = false;

  constructor(private googleMapsAPi: MapsAPILoader) {
    this.getCurrentUserLcoation();
  }

 static deleteSymbolInAdress(adress: string): string {
    return adress.includes('№') ? adress.replace('№', '') : adress;
  }

  showOnMap(adress: string, streetViewNode: ElementRef) {
    this.googleMapsAPi.load().then((map) => {
      this.geocoder = new google.maps.Geocoder();
      this.codeAddress(GoogleMapsService.deleteSymbolInAdress(adress)).subscribe(res => {
        this.destination = {lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng() };
        this.initStreetViewPanorama(this.destination, streetViewNode.nativeElement);
        this.displayRoutes(this.origin, this.destination, this.directionsService, this.directionsDisplay);
        this.map.setCenter({lat: this.destination.lat, lng: this.destination.lng});
        this.map.setZoom(8);
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

  getCurrentUserLcoation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.origin = {lat: position.coords.latitude, lng: position.coords.longitude};
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  initMap(map) {
    this.googleMapsAPi.load().then(() => {
      this.map = map;
       this.directionsService = new google.maps.DirectionsService;
       this.directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map
      });
    });
  }

  displayRoutes(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
    }, (response, status) => {
      return status === 'OK' ? display.setDirections(response) : console.log('Could not display directions due to: ' + status);
    });
  }

  initStreetViewPanorama(destination, node: HTMLDivElement) {
    const options = {
      position: destination,
      pov: {heading: 165, pitch: 0},
      zoom: 1
    };
    const panorama = new google.maps.StreetViewPanorama(node, options);
  }
}
