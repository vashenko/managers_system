import {BehaviorSubject} from 'rxjs';
import {ShowedManager} from '../../../domains/showed-manager';

export class SubdivisionsManagersDataBase {
  public dataChange: BehaviorSubject<ShowedManager[]> = new BehaviorSubject<ShowedManager[]>([]);
  public get data(): ShowedManager[] {
    return this.dataChange.value ;
  }

  constructor(private managers: ShowedManager[]) {
    this.dataChange.next(this.managers);
  }
}
