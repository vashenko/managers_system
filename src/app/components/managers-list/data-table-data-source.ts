import {ShowedManager} from '../../domains/showed-manager';
import {BehaviorSubject, merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {DataBase} from './data-base';

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

  private sortData(data: ShowedManager[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'position': return compare(+a.position, +b.position, isAsc);
        case 'direction': return compareString(a.direction, b.direction, isAsc);
        case 'name': return compareString(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

function compareString(a, b, isAsc) {
  const convertedA = a.replace(/\d+/g, '').replace(/\./g, '').toLowerCase(),
        convertedB = b.replace(/\d+/g, '').replace(/\./g, '').toLowerCase();
  return (convertedA < convertedB ? -1 : 1) * (isAsc ? 1 : -1);
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




// import {ShowedManager} from '../../domains/showed-manager';
// import {merge, Observable, of as observableOf} from 'rxjs';
// import {map} from 'rxjs/operators';
// import {MatPaginator, MatSort} from '@angular/material';
// import {DataSource} from '@angular/cdk/table';
//
// export class DataTableDataSource extends DataSource<ShowedManager> {
//   constructor(private paginator: MatPaginator, private sort: MatSort, private data: ShowedManager[]) {
//     super();
//   }
//
//   connect(): Observable<ShowedManager[]> {
//     const dataMutations = [
//       observableOf(this.data),
//       this.paginator.page,
//       this.sort.sortChange
//     ];
//
//     this.paginator.length = this.data.length;
//
//     return merge(...dataMutations).pipe(map(() => {
//       return this.getPagedData(this.getSortedData([...this.data]));
//     }));
//   }
//
//   disconnect() {}
//
//   getPagedData(data: ShowedManager[]) {
//     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//     return data.splice(startIndex, this.paginator.pageSize);
//   }
//
// }

