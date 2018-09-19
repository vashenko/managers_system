import {ManagerClient} from './client.modetl';
import {Subscription} from 'rxjs';

export class Manager {
  constructor(
              public active: boolean,
              public directionId: string,
              public directionName: string,
              public email: string,
              public headId: string,
              public headName: string,
              public id: string,
              public name: string,
              public salesManager: boolean,
              public unitId: string,
              public unitName: string,
              public user1cId: string,
              public user1cName: string,
              ) {
              // public Monday: ManagerClient[],
              // public Tuesday: ManagerClient[],
              // public Wednesday: ManagerClient[],
              // public Thursday: ManagerClient[],
              // public Friday: ManagerClient[],
              // public AnyDay: ManagerClient[]) {
  }
}
