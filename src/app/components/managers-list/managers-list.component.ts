import {Component, OnInit } from '@angular/core';
// import {MatPaginator, MatSort} from '@angular/material';
// import {DataTableDataSource} from './data-table-data-source';
// import {DataBase} from './data-base';
// import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
// import {fromEvent} from 'rxjs';
// import {HttpService} from '../../services/http.service';
// import {ManagerService} from '../../services/manager.service';
// import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css'],
})
export class ManagersListComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('filter') filter: ElementRef;

  // dataSource: DataTableDataSource | null;
  // dataBase: DataBase;
  //
  // displayedColumns: string[] = ['direction', 'MondayClients', 'MondayOrders', 'TuesdayClients', 'TuesdayOrders',
  //                               'WednesdayClients', 'WednesdayOrders', 'ThursdayClients', 'ThursdayOrders',
  //                               'FridayClients', 'FridayOrders', 'AnyDayClients', 'AnyDayOrders'];
  //
  // weekDays: string[] = ['empty', 'Monday', 'Tuesday', 'Wednesday',
  //                       'Thursday', 'Friday', 'AnyDay'];

  constructor() {}
  // private managerService: ManagerService, private httpService: HttpService, private date: DateService
  ngOnInit() {
    // this.initDataBase();
    // this.findManagers();
  }

  // initDataBase() {
  //   this.dataBase = new DataBase(this.managerService, this.httpService);
  //   this.dataSource = new DataTableDataSource(this.dataBase, this.paginator, this.sort);
  // }
  //
  // findManagers() {
  //   fromEvent(this.filter.nativeElement, 'keyup').pipe(
  //     debounceTime(450),
  //     distinctUntilChanged(),
  //   ).subscribe(() => {
  //     if (!this.dataSource) {return;}
  //     this.dataSource.filter = this.filter.nativeElement.value;
  //   });
  // }
}


