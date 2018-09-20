import {ClientsAndRecOrdersCount} from './clients-recOrderc-count';
import {Optional} from '@angular/core';

export class ShowedManager {
  constructor(public position: number,
              public name: string,
              public direction: string,
              public id: string,
              @Optional() public Monday: ClientsAndRecOrdersCount,
              @Optional() public Tuesday: ClientsAndRecOrdersCount,
              @Optional() public Wednesday: ClientsAndRecOrdersCount,
              @Optional() public Thursday: ClientsAndRecOrdersCount,
              @Optional() public Friday: ClientsAndRecOrdersCount,
              @Optional() public AnyDay: ClientsAndRecOrdersCount,) {

  }
}
