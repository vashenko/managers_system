import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {HttpService} from '../../services/http.service';
import {ManagerService} from '../../services/manager-service.service';
import {ShowedManager} from '../../domains/showed-manager';
import {RecommendedOrders} from '../../domains/recomendedOrder.model';
import {DataTableDataSource} from './data-table-data-source';
import {debounceTime, distinctUntilChanged, switchMap, map} from 'rxjs/operators';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {DateService} from '../../services/date-service.service';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css'],
})
export class ManagersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  dataSource: DataTableDataSource | null;
  dataBase: DataBase;

  displayedColumns: string[] = ['position', 'direction', 'name', 'Monday', 'Tuesday',
                                'Wednesday', 'Thursday', 'Friday', 'AnyDay'];

  constructor(private managerService: ManagerService, private httpService: HttpService, private date: DateService) {}

  ngOnInit() {
    this.dataBase = new DataBase(this.managerService, this.httpService);
    this.dataSource = new DataTableDataSource(this.dataBase, this.paginator, this.sort);

    // this.searchField = new FormControl();
    // this.recOrders = this.httpService.getRecommendedOrders();
    // this.httpService.getApiData().subscribe(res => {
    //   this.data = this.managerService.convertIntoShowManagers(res[0], res[1], this.recOrders);
    //   this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.data);
    // });
    // const obs = fromEvent(this.filter.nativeElement, 'keyup').pipe(
    //   map((e: any) => e.target.value),
    //   debounceTime(250),
    //   distinctUntilChanged()
    // ).subscribe(() => {
    // })

  }
}

export class DataBase {
  showedManagers: ShowedManager[] = [];
  recOrders: RecommendedOrders[] = [];

  dataChange: BehaviorSubject<ShowedManager[]> = new BehaviorSubject<ShowedManager[]>([]);
  get data(): ShowedManager[] {
    return this.dataChange.value ;
  };

  constructor(private managerService: ManagerService, private httpService: HttpService) {
    this.recOrders = this.httpService.getRecommendedOrders();
    this.httpService.getApiData().subscribe(res => {
      this.showedManagers = this.managerService.convertIntoShowManagers(res[0], res[1], this.recOrders);
      this.dataChange.next(this.showedManagers);
    });
  }
}



