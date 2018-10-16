import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleStreetViewService {

  constructor() { }

  initStreetViewPanorama(destination, node: HTMLDivElement) {
    const options = {
      position: destination,
      pov: {heading: 165, pitch: 0},
      zoom: 1
    };
    const panorama = new google.maps.StreetViewPanorama(node, options);
  }
}
