import {Injectable} from '@angular/core';
import {Manager} from '../domains/manager.model';
import {FirebaseService} from './firebase.service';
import {ScheduleItem} from '../domains/ScheduleItem';
import {ManagerClient} from '../domains/client.modetl';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor(private firebaseService: FirebaseService) {
  }

  intoManagers(res, managers): Manager[] {
    res.forEach(item => {
      managers.push(new Manager(item['active'], item['directionId'], item['directionName'], item['email'], item['headId'],
        item['headName'], item['managerId'], item['managerName'], item['salesManager'], item['unitId'],
        item['unitName'], item['user1cId'], item['user1cName']));
    });
    return managers.filter(manager => {
      return manager.active === true;
    });
  }

  intoScheduleItems(res, result): ScheduleItem[] {
    res.forEach(item => result.push(
      new ScheduleItem(
        item['managerId'], this.getClientsByDay(item['Monday']),
        this.getClientsByDay(item['Tuesday']), this.getClientsByDay(item['Wednesday']),
        this.getClientsByDay(item['Thursday']), this.getClientsByDay(item['Friday']), this.getClientsByDay(item['AnyDay']))));
    return result;
  }

  getClientsByDay(ClientsArray: {}): ManagerClient[] {
    const clients: ManagerClient[] = [];
    for (const v in ClientsArray) {
      clients.push(new ManagerClient(ClientsArray[v].clientName, ClientsArray[v].clientId));
    }
    return clients;
  }

}
