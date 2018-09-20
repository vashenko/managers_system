import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {HttpService} from '../../services/http.service';
import {ManagerService} from '../../services/manager-service.service';
import {ShowedManager} from '../../domains/showed-manager';
import {DataSource } from '@angular/cdk/table';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {RecommendedOrders} from '../../domains/recomendedOrder.model';
import {ConvertService} from '../../services/convert.service';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css'],
})
export class ManagersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource | null;

  data: ShowedManager[] = [];
  recOrders: RecommendedOrders[] = [];

  displayedColumns: string[] = ['position', 'direction', 'name', 'Monday', 'Tuesday',
                                'Wednesday', 'Thursday', 'Friday', 'AnyDay'];

  constructor(private managerService: ManagerService, private httpService: HttpService, private convert: ConvertService) {}

  ngOnInit() {
    this.recOrders = this.httpService.getRecommendedOrders();
    this.httpService.getApiData().subscribe(res => {
      this.data = this.managerService.convertIntoShowManagers(res[0], res[1], this.recOrders);
      this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.data);
    });
  }
}

export class DataTableDataSource extends DataSource<ShowedManager> {
  constructor(private paginator: MatPaginator, private sort: MatSort, private data: ShowedManager[]) {
    super();
  }

  connect(): Observable<ShowedManager[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  getPagedData(data: ShowedManager[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ShowedManager[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'position': return compare(+a.position, +b.position, isAsc);
        case 'direction': return compare(a.direction, b.direction, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


