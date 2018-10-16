import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'app-google-map-wrapper',
  templateUrl: './google-map-wrapper.component.html',
  styleUrls: ['./google-map-wrapper.component.css']
})
export class GoogleMapWrapperComponent implements OnInit {
  @Output() mapLoad: EventEmitter<{}> = new EventEmitter<{}>();
  public directionsDisplay: any;
  constructor(public gMaps: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.gMaps.getNativeMap().then((map) => {
      this.mapLoad.emit(map);
    });
  }
}
