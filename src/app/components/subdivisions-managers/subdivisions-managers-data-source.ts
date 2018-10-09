import {DataSource} from '@angular/cdk/table';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SubdivisionsManagersDataBase} from './subdivisions-managers-data-base';
import {ShowedManager} from '../../domains/showed-manager';

export class  SubdivisionsManagersDataSource extends DataSource<ShowedManager> {
  // filteredData: ShowedManager[] = [];
  renderedData: ShowedManager[] = [];
  // filterChange = new BehaviorSubject('');
  // get filter(): string {
  //   return this.filterChange.value;
  // }
  // set filter(filter: string) {
  //   this.filterChange.next(filter);
  // }

  constructor(private dataBase: SubdivisionsManagersDataBase) {
    super();
    // this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  connect(): Observable<ShowedManager[]> {
    const displayDataChanges = [
      this.dataBase.dataChange
      // this.sort.sortChange,
      // this.filterChange,
      // this.paginator.page
    ];

    return merge(...displayDataChanges).pipe(map(() => {
      // this.filteredData = this.dataBase.data.slice().filter((item: ShowedManager) => {
      //   const searchStr = (item.direction).toLocaleLowerCase();
      //   return searchStr.indexOf(this.filter.toLocaleLowerCase()) !== - 1;
      // });
      // const sortedData = this.sortData(this.filteredData.slice());
      // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = this.dataBase.data;
      return this.renderedData;
    }));
  }

  disconnect() {
  }

  // private sortData(data: ShowedManager[]) {
  //   if (!this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }
  //
  //   return data.sort((a, b) => {
  //     const isAsc = this.sort.direction === 'asc';
  //     switch (this.sort.active) {
  //       case 'direction': return compareString(a.name, b.name, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

// function compareString(a, b, isAsc) {
//   const convertedA = a.replace(/\d+/g, '').replace(/\./g, '').toLowerCase(),
//     convertedB = b.replace(/\d+/g, '').replace(/\./g, '').toLowerCase();
//   return (convertedA < convertedB ? -1 : 1) * (isAsc ? 1 : -1);
// }
//
