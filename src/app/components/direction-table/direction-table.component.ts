import {Component, OnInit, ViewChild} from '@angular/core';
import {ShowedManager} from '../../domains/showed-manager';
import {RecommendedOrders} from '../../domains/recomendedOrder.model';
import {Subdivision} from '../../domains/subdivision.model';
import {DxDataGridComponent} from 'devextreme-angular';
import {ManagerService} from '../../services/manager.service';
import {HttpService} from '../../services/http.service';
import {DateService} from '../../services/date.service';
import {PagerService} from '../../services/pager.service';
import {SubdivisionService} from '../../services/subdivision.service';

@Component({
  selector: 'app-tree',
  templateUrl: './direction-table.component.html',
  styleUrls: ['./direction-table.component.css']
})
export class DirectionTableComponent implements OnInit {
  @ViewChild(DxDataGridComponent) viewDataGrid: DxDataGridComponent;
  showedManagers: ShowedManager[] = [];
  recOrders: RecommendedOrders[] = [];
  dataSource: Subdivision[] = [];
  dataIsLoading = true;

  constructor(private managerService: ManagerService, private httpService: HttpService, private date: DateService,
              private subdivisionService: SubdivisionService, private pager: PagerService) {
  // private managerService: ManagerService, private httpService: HttpService, private date: DateService,
  // private subdivisionService: SubdivisionService, private pager: PagerService
  }
  ngOnInit() {
    this.initTableData();
  }

  initTableData()  {
    this.recOrders = this.httpService.getRecommendedOrders();
    this.httpService.getApiData().subscribe(res => {
      this.showedManagers = this.managerService.convertIntoShowedManagers(res[0], res[1], this.recOrders);
      this.dataIsLoading = false;
      this.dataSource = this.subdivisionService.getSubdivisions(this.showedManagers, 'direction');
    });
  }

  shown() {
    setTimeout(() => {
      this.pager.loadingVisible = false;
    }, 500);
  }

  pagerHandler(event: any): void {
    const dataGrid = event.component;
    this.pager.onPageChanged(dataGrid);
    this.pager.onPageSizeChanged(dataGrid, this.viewDataGrid);
  }
}
