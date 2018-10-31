import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsService} from '../../../services/google-maps.service';
import {ActivatedRoute} from '@angular/router';
import {Mark} from '../../../domains/google-mark.model';
import {Subscription} from 'rxjs';
import {SubscriptionHandlerService} from '../../../services/subscription-handler.service';

@Component({
  selector: 'app-clients-maps',
  templateUrl: './clients-maps.component.html',
  styleUrls: ['./clients-maps.component.css']
})
export class ClientsMapsComponent implements OnInit, OnDestroy {
  @ViewChild('streetView') streetViewNode: ElementRef;
  public urlAddress = '';
  public mark: Mark;
  private subscriptions: Subscription[] = [];
  constructor(public googleMapService: GoogleMapsService, private route: ActivatedRoute, private sh: SubscriptionHandlerService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        params ? this.urlAddress = params['address'] : this.urlAddress = '';
      }),
      this.googleMapService.getMarkLatLang().subscribe(res => {
        this.mark = res;
      })
    );
  }

  public showStreetViewPano(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? 'block' : 'none';
  }

  public googleMapWidthHandler(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? '75%' : '100%';
  }

  public showOnMap(adress: string): void {
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
    this.sh.clearAfterSubscriptions(this.subscriptions);
  }
}




