import {Component, OnInit} from '@angular/core';
import {GoogleMapsService} from '../../../services/google-maps.service';

@Component({
  selector: 'app-clients-maps',
  templateUrl: './clients-maps.component.html',
  styleUrls: ['./clients-maps.component.css']
})
export class ClientsMapsComponent implements OnInit {
  map: any;
  marker = {
    lat: 48.379433,
    lng: 31.16557990000001
  };
  constructor(private googleMapService: GoogleMapsService) {

  }

  getMap(map) {
    this.map = map;
  }

  ngOnInit() {
  }
}


