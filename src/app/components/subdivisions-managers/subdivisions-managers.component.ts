import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {ShowedManager} from '../../domains/showed-manager';
import {DateService} from '../../services/date.service';
import {MatPaginator, MatSort} from '@angular/material';
import {SubdivisionsManagersDataBase} from './subdivisions-managers-data-base';
import {SubdivisionsManagersDataSource} from './subdivisions-managers-data-source';

@Component({
  selector: 'app-subdivisions-managers',
  templateUrl: './subdivisions-managers.component.html',
  styleUrls: ['./subdivisions-managers.component.css']
})
export class SubdivisionsManagersComponent implements OnInit {
  @Input() managers: ShowedManager[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  dataBase: SubdivisionsManagersDataBase;
  dataSource: SubdivisionsManagersDataSource;
  displayedColumns: string[] = ['name', 'MondayClients', 'MondayOrders', 'TuesdayClients', 'TuesdayOrders',
                                'WednesdayClients', 'WednesdayOrders', 'ThursdayClients', 'ThursdayOrders',
                                'FridayClients', 'FridayOrders', 'AnyDayClients', 'AnyDayOrders'];
  weekDays: string[] = ['empty', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'AnyDay'];

  constructor(private date: DateService) { }

  ngOnInit() {
    this.dataBase = new SubdivisionsManagersDataBase(this.managers);
    this.dataSource = new SubdivisionsManagersDataSource(this.dataBase, this.paginator, this.sort);
  }
}



