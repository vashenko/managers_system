import {BehaviorSubject} from 'rxjs';
import {ManagerService} from '../../services/manager.service';
import {RecommendedOrders} from '../../domains/recomendedOrder.model';
import {HttpService} from '../../services/http.service';
import {ShowedManager} from '../../domains/showed-manager';
import {GroupByPipe} from '../../pipes/group-by.pipe';
import {GroupedByDirection} from '../../domains/grouped-direction.model';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';

export class DataBase {
  showedManagers: ShowedManager[] = [];
  recOrders: RecommendedOrders[] = [];
  groupedData: GroupedByDirection[] = [];
  isLoading = true;
  isRateLimitReached = false;
  groupByDirection = new GroupByPipe();

  dataChange: BehaviorSubject<GroupedByDirection[]> = new BehaviorSubject<GroupedByDirection[]>([]);
  get data(): GroupedByDirection[] {
    return this.dataChange.value ;
  }

  constructor(private managerService: ManagerService, private httpService: HttpService) {
    this.recOrders = this.httpService.getRecommendedOrders();
    this.httpService.getApiData().subscribe(res => {
      this.showedManagers = this.managerService.convertIntoShowedManagers(res[0], res[1], this.recOrders);
      this.groupedData = this.groupByDirection.transform(this.showedManagers, 'direction');
      this.dataChange.next(this.groupedData);
      this.isLoading = false;
    }, error => {
      this.isRateLimitReached = true;
    });
  }
}
