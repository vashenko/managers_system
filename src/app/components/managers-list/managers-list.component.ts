import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {HttpService} from '../../services/http.service';
import {ManagerService} from '../../services/manager-service.service';
import {DataTableDataSource} from './data-table-data-source';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {DataBase} from './data-base';
import {fromEvent} from 'rxjs';
import {DateService} from '../../services/date-service.service';
import {AuthService} from '../../services/auth.service';

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

  displayedColumns: string[] = ['position', 'direction', 'name',
                                'MondayClients', 'MondayRecOrders', 'TuesdayClients', 'TuesdayRecOrders',
                                'WednesdayClients', 'WednesdayRecOrders', 'ThursdayClients', 'ThursdayRecOrders',
                                'FridayClients', 'FridayRecOrders', 'AnyDayClients', 'AnyDayRecOrders'];

  weekDays: string[] = ['empty', 'Monday', 'Tuesday', 'Wednesday',
                        'Thursday', 'Friday', 'AnyDay'];

  constructor(private managerService: ManagerService, private httpService: HttpService, private date: DateService,
              private auth: AuthService) {}

  ngOnInit() {
    this.dataBase = new DataBase(this.managerService, this.httpService);
    this.dataSource = new DataTableDataSource(this.dataBase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(450),
      distinctUntilChanged(),
    ).subscribe(() => {
      if (!this.dataSource) {return;}
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

}


