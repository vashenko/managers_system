import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsService} from '../../../services/google-maps.service';
import {ActivatedRoute} from '@angular/router';
import {Mark} from '../../../domains/google-mark.model';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-clients-maps',
  templateUrl: './clients-maps.component.html',
  styleUrls: ['./clients-maps.component.css']
})
export class ClientsMapsComponent implements OnInit, OnDestroy {
  @ViewChild('streetView') streetViewNode: ElementRef;
  @ViewChild('searchIcon') search: ElementRef;
  public clientAddress: string;
  public mark: Mark;
  public geocodingResult: boolean;
  private clientId: string;
  constructor(private googleMapService: GoogleMapsService, private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
      this.googleMapService.getMarkLatLang().pipe(
        takeUntil(componentDestroyed(this))
      ).subscribe(res => {
        this.mark = res;
      });
      this.route.params.pipe(
        takeUntil(componentDestroyed(this))
      ).subscribe(params => {
        if (params) {
          this.clientAddress = params['address'];
          this.clientId = params['id'];
          this.triggerClick();
        } else {
          return;
        }
      });
      this.googleMapService.getGeocodingResult().pipe(
        takeUntil(componentDestroyed(this))
      ).subscribe(res => {
        this.geocodingResult = res;
      });
  }

  public showStreetViewPano(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? 'block' : 'none';
  }

  public googleMapWidthHandler(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? '75%' : '100%';
  }

  public showOnMap(): void {
    this.googleMapService.showOnMap(this.clientAddress, this.streetViewNode.nativeElement);
    console.log(this.mark);
    this.http.sendUserLatAndLng(this.mark.lat, this.mark.lng);
  }

  // public replaceMark(event): void {
  //   this.googleMapService.replaceMark(event, this.streetViewNode.nativeElement);
  //   this.http.sendUserLatAndLng(this.mark.lat, this.mark.lng);
  // }

  public initMap(map): void {
    this.googleMapService.initMap(map);
  }

  private triggerClick() {
    const el: HTMLElement = this.search.nativeElement;
    el.click();
  }

  ngOnDestroy(): void {

  }
}




