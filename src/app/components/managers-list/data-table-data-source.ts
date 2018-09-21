import {ShowedManager} from '../../domains/showed-manager';
import {BehaviorSubject, merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {DataBase} from './managers-list.component';

export class  DataTableDataSource extends DataSource<ShowedManager> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  };
  set filter(filter: string) {
    this.filterChange.next(filter);
  };

  filteredData: ShowedManager[] = [];
  renderedData: ShowedManager[] = [];

  constructor(private dataBase: DataBase, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  connect(): Observable<ShowedManager[]> {
    const displayDataChanges = [
      this.dataBase.dataChange,
      this.sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];

    return merge(...displayDataChanges).pipe(map(() => {
      this.filteredData = this.dataBase.data.slice().filter((item: ShowedManager) => {
        let searchStr = (item.name + item.direction).toLocaleLowerCase();
        return searchStr.indexOf(this.filter.toLocaleLowerCase()) !== - 1;
      });

      const sortedData = this.sortData(this.filteredData.slice());
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
      return this.renderedData;
    }));
  }

  disconnect() {}

  sortData(data: ShowedManager[]): ShowedManager[] {
    if (this.sort.active || this.sort.direction === '') {
      return data;
    };

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this.sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'direction': [propertyA, propertyB] = [a.direction, b.direction]; break;

      }
      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }
}
