import {BehaviorSubject} from 'rxjs';
import {ManagerService} from '../../services/manager.service';
import {RecommendedOrders} from '../../domains/recomendedOrder.model';
import {HttpService} from '../../services/http.service';
import {ShowedManager} from '../../domains/showed-manager';

export class DataBase {
  showedManagers: ShowedManager[] = [];
  recOrders: RecommendedOrders[] = [];
  isLoading = true;
  isRateLimitReached = false;

  dataChange: BehaviorSubject<ShowedManager[]> = new BehaviorSubject<ShowedManager[]>([]);
  get data(): ShowedManager[] {
    return this.dataChange.value ;
  }

  constructor(private managerService: ManagerService, private httpService: HttpService) {
    this.recOrders = this.httpService.getRecommendedOrders();
    this.httpService.getApiData().subscribe(res => {
      this.showedManagers = this.managerService.convertIntoShowedManagers(res[0], res[1], this.recOrders);
      this.isLoading = false;
      this.dataChange.next(this.showedManagers);
    }, error => {
      this.isRateLimitReached = true;
    });
  }
}
