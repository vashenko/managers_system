// import {DataSource} from '@angular/cdk/table';
// import {MatPaginator, MatSort} from '@angular/material';
// import {BehaviorSubject, merge, Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
// import {DataBase} from './data-base';
// import {GroupedByDirection} from '../../domains/grouped-direction.model';
//
// export class  DataTableDataSource extends DataSource<GroupedByDirection> {
//   filterChange = new BehaviorSubject('');
//   get filter(): string {
//     return this.filterChange.value;
//   }
//   set filter(filter: string) {
//     this.filterChange.next(filter);
//   }
//
//   isLoading = true;
//   filteredData: GroupedByDirection[] = [];
//   renderedData: GroupedByDirection[] = [];
//
//   constructor(private dataBase: DataBase, private paginator: MatPaginator, private sort: MatSort) {
//     super();
//     this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
//   }
//
//   connect(): Observable<GroupedByDirection[]> {
//     this.isLoading = false;
//     const displayDataChanges = [
//       this.dataBase.dataChange,
//       this.sort.sortChange,
//       this.filterChange,
//       this.paginator.page
//     ];
//
//     return merge(...displayDataChanges).pipe(map(() => {
//       this.filteredData = this.dataBase.data.slice().filter((item: GroupedByDirection) => {
//         const searchStr = (item.direction).toLocaleLowerCase();
//         return searchStr.indexOf(this.filter.toLocaleLowerCase()) !== - 1;
//       });
//       const sortedData = this.sortData(this.filteredData.slice());
//       const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//       this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
//       return this.renderedData;
//     }));
//   }
//
//   disconnect() {
//   }
//
//   private sortData(data: GroupedByDirection[]) {
//     if (!this.sort.active || this.sort.direction === '') {
//       return data;
//     }
//
//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === 'asc';
//       switch (this.sort.active) {
//         case 'direction': return compareString(a.direction, b.direction, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }
//
// function compareString(a, b, isAsc) {
//   const convertedA = a.replace(/\d+/g, '').replace(/\./g, '').toLowerCase(),
//         convertedB = b.replace(/\d+/g, '').replace(/\./g, '').toLowerCase();
//   return (convertedA < convertedB ? -1 : 1) * (isAsc ? 1 : -1);
// }
//
// function compare(a, b, isAsc) {
//   return (a < b ? 1 : -1) * (isAsc ? 1 : -1);
// }
//
//
