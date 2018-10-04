import {ManagerClient} from './client.modetl';
import {Optional} from '@angular/core';

export class ScheduleItem {
  constructor(public managerId: string,
              @Optional() public Monday: ManagerClient[],
              @Optional() public Tuesday: ManagerClient[],
              @Optional() public Wednesday: ManagerClient[],
              @Optional() public Thursday: ManagerClient[],
              @Optional() public Friday: ManagerClient[],
              @Optional() public AnyDay: ManagerClient[]) {
  }
}

