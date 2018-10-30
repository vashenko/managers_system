import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {ShowedManager} from '../../../domains/showed-manager';
import {SubdivisionsManagersDataBase} from './subdivisions-managers-data-base';
import {SubdivisionsManagersDataSource} from './subdivisions-managers-data-source';

@Component({
  selector: 'app-subdivisions-managers',
  templateUrl: './subdivisions-managers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./subdivisions-managers.component.css']
})
export class SubdivisionsManagersComponent implements OnInit {
  @Input() managers: ShowedManager[];
  dataBase: SubdivisionsManagersDataBase;
  dataSource: SubdivisionsManagersDataSource;
  displayedColumns: string[] = ['name', 'MondayClients', 'MondayOrders', 'TuesdayClients', 'TuesdayOrders',
                                'WednesdayClients', 'WednesdayOrders', 'ThursdayClients', 'ThursdayOrders',
                                'FridayClients', 'FridayOrders', 'AnyDayClients', 'AnyDayOrders'];
  constructor() { }

  ngOnInit() {
    this.dataBase = new SubdivisionsManagersDataBase(this.managers);
    this.dataSource = new SubdivisionsManagersDataSource(this.dataBase);
  }
}



