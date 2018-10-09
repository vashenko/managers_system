import { Component, OnInit } from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {GoogleMapsService} from '../../services/google-maps.service';

@Component({
  selector: 'app-clients-maps',
  templateUrl: './clients-maps.component.html',
  styleUrls: ['./clients-maps.component.css']
})
export class ClientsMapsComponent implements OnInit {
  marker = {
    lat: 0,
    lng: 0
  };
  constructor(private googleMapsAPi: MapsAPILoader, private googleMapService: GoogleMapsService) {
  }

  ngOnInit() {
  }

  mapPam(event: any) {

  }
}
