import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {
  loadingVisible: boolean;
  lastPageIndex = -1;
  lastPageSize = -1;

  constructor() { }

  static hidePager(dataGrid: any): void {
    dataGrid.instance.option({
      pager: {
        visible: false
      },
    });
  }

  static showPager(dataGrid: any): void {
    dataGrid.instance.option({
      pager: {
        visible: true
      },
    });
  }

  static pagerToggler(pageSize: number, dataGrid: any): void {
    if (pageSize < 5) {
      PagerService.hidePager(dataGrid);
    } else {
      PagerService.showPager(dataGrid);
    }
  }

  onPageChanged(e: any): void {
    const currentPageIndex = e.pageIndex();
    if (this.lastPageIndex === -1) {
      this.lastPageIndex = currentPageIndex;
    } else {
      if (this.lastPageIndex !== currentPageIndex) {
        this.loadingVisible = true;
        this.lastPageIndex = currentPageIndex;
      }
    }
  }

  onPageSizeChanged(e: any, viewDataGrid: any): void {
    const currentVisibleRows = e.getVisibleRows().length;
    if (this.lastPageSize === -1) {
      this.lastPageSize = currentVisibleRows;
    } else {
      if (this.lastPageSize !== currentVisibleRows) {
        this.loadingVisible = true;
        this.lastPageSize = currentVisibleRows;
        PagerService.pagerToggler(this.lastPageSize, viewDataGrid);
      }
    }
  }
}
