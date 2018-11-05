import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsService} from '../../../services/google-maps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Mark} from '../../../domains/google-mark.model';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

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
  private clientId: string;
  constructor(public googleMapService: GoogleMapsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.googleMapService.getMarkLatLang().pipe(
      takeUntil(componentDestroyed(this))
    ).subscribe(res => {
      this.mark = res;
    });

    this.route.params.pipe(
      takeUntil(componentDestroyed(this))
    ).subscribe(params => {
      if (!params['address'] || !params['id']) {
        this.router.navigate(['map']);
        throw new Error('One of the parameters for the search is not set');
      } else {
        this.clientAddress = params['address'];
        this.clientId = params['id'];
      }
    });
  }

  public showStreetViewPano(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? 'block' : 'none';
  }

  public googleMapWidthHandler(): string {
    return this.streetViewNode.nativeElement.hasChildNodes() ? '75%' : '100%';
  }

  public showOnMap(): void {
    if (!this.clientId || !this.clientAddress) return;
    this.googleMapService.showOnMap(this.clientAddress, this.streetViewNode.nativeElement);
    this.router.navigate(['map', {address: this.clientAddress, id: this.clientId}]);
  }

  public replaceMark(event): void {
    this.googleMapService.replaceMark(event, this.streetViewNode.nativeElement);
  }

  public initMap(map): void {
    this.googleMapService.initMap(map);
  }

  ngOnDestroy(): void {
    this.googleMapService.showMark = false;
  }

}



