import {Component, OnInit} from '@angular/core';
import {ShowedManager} from '../../domains/showed-manager';
import {RecommendedOrders} from '../../domains/recomendedOrder.model';
import {GroupedByDirection} from '../../domains/grouped-direction.model';
import {ManagerService} from '../../services/manager.service';
import {HttpService} from '../../services/http.service';
import {DateService} from '../../services/date.service';
import {GroupedDataService} from '../../services/grouped-data.service';

@Component({
  selector: 'app-tree',
  templateUrl: './direction-table.component.html',
  styleUrls: ['./direction-table.component.css']
})
export class DirectionTableComponent implements OnInit {
  showedManagers: ShowedManager[] = [];
  recOrders: RecommendedOrders[] = [];
  data: GroupedByDirection[] = [];
  dataLoadingText = 'Data is Loading...';
  lastPageIndex = -1;
  loadingVisible: boolean;

  constructor(private managerService: ManagerService, private httpService: HttpService, private date: DateService,
              private groupedDataService: GroupedDataService ) {
  }
  ngOnInit() {
    this.initTableData();
  }

  initTableData() {
    this.recOrders = this.httpService.getRecommendedOrders();
    this.httpService.getApiData().subscribe(res => {
      this.showedManagers = this.managerService.convertIntoShowedManagers(res[0], res[1], this.recOrders);
      this.data = this.groupedDataService.getGroupedByDirectionData(this.showedManagers, 'direction');
    });
  }

  Shown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 500);
  }

  onContentReady(e:any): void {
    const dataGrid = e.component;
    const currentPageIndex = dataGrid.pageIndex();
    if (this.lastPageIndex === -1) {
      this.lastPageIndex = currentPageIndex;
    } else {
      if ( this.lastPageIndex !== currentPageIndex) {
        this.loadingVisible = true;
        this.lastPageIndex = currentPageIndex;
      }
    }
  }
}
