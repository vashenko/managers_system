import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {GoogleMapsService} from '../../../services/google-maps.service';

@Component({
  selector: 'app-clients-maps',
  templateUrl: './clients-maps.component.html',
  styleUrls: ['./clients-maps.component.css']
})
export class ClientsMapsComponent implements OnInit {
  @ViewChild('streetView') streetViewNode: ElementRef;

  constructor(private googleMapService: GoogleMapsService) {}

  ngOnInit() {
  }

   private showStreetViewPano(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? 'block' : 'none';
  }

   private googleMapWidthHandler(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? 75 + '%' : 100 + '%';
  }

  check() {
    console.log('da');
  }
}




