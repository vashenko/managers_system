import { Component, OnInit } from '@angular/core';
import {Subdivision} from '../../domains/subdivision.model';
import {ShowedManager} from '../../domains/showed-manager';
import {ClientsAndRecOrdersCount} from '../../domains/clients-recOrderc-count';
import {ClientsAndOrdersSummary} from '../../domains/clients-and-orders-summary.model';
import {DateService} from '../../services/date.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TestComponent implements OnInit {
  subdivisions: Subdivision[];
  showedManagers: ShowedManager[];
  expandedElement: Subdivision;
  displayedColumns: string[] = ['direction', 'MondayClientsSummary', 'MondayOrdersSummary',
                                'TuesdayClientsSummary', 'TuesdayOrdersSummary',
                                'WednesdayClientsSummary', 'WednesdayOrdersSummary',
                                'ThursdayClientsSummary', 'ThursdayOrdersSummary',
                                'FridayClientsSummary', 'FridayOrdersSummary',
                                'AnyDayClientsSummary', 'AnyDayOrdersSummary'];
  weekDays: string[] = ['empty', 'Monday', 'Tuesday', 'Wednesday',
                        'Thursday', 'Friday', 'AnyDay'];
  constructor(private date: DateService) { }

  ngOnInit() {
    this.showedManagers = [new ShowedManager('Andrew', 'Kiev', '123',
                                              new ClientsAndRecOrdersCount(1, 2),
                                              new ClientsAndRecOrdersCount(3, 4),
                                              new ClientsAndRecOrdersCount(5, 6),
                                              new ClientsAndRecOrdersCount(7, 8),
                                              new ClientsAndRecOrdersCount(9 , 10),
                                              new ClientsAndRecOrdersCount(11, 12))];
    this.subdivisions = [
      new Subdivision('Kiev', this.showedManagers,
        new ClientsAndOrdersSummary(1 ,2),
        new ClientsAndOrdersSummary(3 ,4),
        new ClientsAndOrdersSummary(5 ,6),
        new ClientsAndOrdersSummary(7 ,8),
        new ClientsAndOrdersSummary(9 ,10),
        new ClientsAndOrdersSummary(11 ,12))
    ];
  }
  expendRow(element): void {
    if (this.expandedElement === element) {
      this.expandedElement = undefined;
    } else {
      this.expandedElement = element;
    }
  }
}
