import {BehaviorSubject, Subscription} from 'rxjs';
import {ManagerService} from '../../../services/manager.service';
import {RecommendedOrders} from '../../../domains/recomendedOrder.model';
import {HttpService} from '../../../services/http.service';
import {ShowedManager} from '../../../domains/showed-manager';
import {Subdivision} from '../../../domains/subdivision.model';
import {SubdivisionService} from '../../../services/subdivision.service';

export class DataBase {
  private showedManagers: ShowedManager[] = [];
  private recOrders: RecommendedOrders[] = [];
  private subdivisions: Subdivision[] = [];
  public isLoading = true;
  public isRateLimitReached = false;
  public subscription: Subscription;

  dataChange: BehaviorSubject<Subdivision[]> = new BehaviorSubject<Subdivision[]>([]);
  get data(): Subdivision[] {
    return this.dataChange.value ;
  }

  constructor(private managerService: ManagerService, private httpService: HttpService, private subdivisionServics: SubdivisionService) {
    this.recOrders = this.httpService.getRecommendedOrders();
    this.subscription = this.httpService.getApiData().subscribe(res => {
      this.showedManagers = this.managerService.convertIntoShowedManagers(res[0], res[1], this.recOrders);
      this.subdivisions = this.subdivisionServics.getSubdivisions(this.showedManagers, 'direction');
      this.dataChange.next(this.subdivisions);
      this.isLoading = false;
    }, error => {
      this.isRateLimitReached = true;
    });
  }
}
