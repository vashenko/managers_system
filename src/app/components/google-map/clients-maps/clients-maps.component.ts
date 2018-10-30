import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsService} from '../../../services/google-maps.service';

@Component({
  selector: 'app-clients-maps',
  templateUrl: './clients-maps.component.html',
  styleUrls: ['./clients-maps.component.css']
})
export class ClientsMapsComponent implements OnInit, OnDestroy {
  @ViewChild('streetView') streetViewNode: ElementRef;

  constructor(public googleMapService: GoogleMapsService) {}

  ngOnInit(): void {
  }

  public showStreetViewPano(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? 'block' : 'none';
  }

  public googleMapWidthHandler(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? '75%' : '100%';
  }

  public showOnMap(adress: string) {
    this.googleMapService.showOnMap(adress, this.streetViewNode.nativeElement);
  }

  public replaceMark(event): void {
    this.googleMapService.replaceMark(event, this.streetViewNode.nativeElement);
  }

  public initMap(map): void {
    this.googleMapService.initMap(map);
  }

  ngOnDestroy(): void {
    this.googleMapService.clearAfterSubscription();
  }
}




