import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {DataTableDataSource} from './data-table-data-source';
import {DataBase} from './data-base';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {HttpService} from '../../../services/http.service';
import {ManagerService} from '../../../services/manager.service';
import {DateService} from '../../../services/date.service';
import {SubdivisionService} from '../../../services/subdivision.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subdivision} from '../../../domains/subdivision.model';

@Component({
  selector: 'app-subdivisions-list',
  templateUrl: './subdivisions-list.component.html',
  styleUrls: ['./subdivisions-list.component.css'],
  animations: [
    trigger('isExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none', color: 'green'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubdivisionsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  public expandedElement: Subdivision;
  public dataSource: DataTableDataSource | null;
  public dataBase: DataBase;
  public displayedColumns: string[] = ['direction', 'MondayClientsSummary', 'MondayOrdersSummary',
                                'TuesdayClientsSummary', 'TuesdayOrdersSummary',
                                'WednesdayClientsSummary', 'WednesdayOrdersSummary',
                                'ThursdayClientsSummary', 'ThursdayOrdersSummary',
                                'FridayClientsSummary', 'FridayOrdersSummary',
                                'AnyDayClientsSummary', 'AnyDayOrdersSummary'];

  public weekDays: string[] = ['empty', 'Monday', 'Tuesday', 'Wednesday',
                        'Thursday', 'Friday', 'AnyDay'];
  public empty: string[] = ['empt'];

  constructor(private managerService: ManagerService, private httpService: HttpService, public date: DateService,
              private subdivisionService: SubdivisionService) {
  }
  ngOnInit() {
    this.initDataSource();
    this.findManagers();
  }

  private initDataSource(): void {
    this.dataBase = new DataBase(this.managerService, this.httpService, this.subdivisionService);
    this.dataSource = new DataTableDataSource(this.dataBase, this.paginator, this.sort);
  }

  private findManagers(): void {
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(450),
      distinctUntilChanged()
    ).subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  private expendRow(element): void {
    if (this.expandedElement === element) {
      this.expandedElement = undefined;
    } else {
      this.expandedElement = element;
    }
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

}


