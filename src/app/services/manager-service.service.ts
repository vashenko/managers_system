import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {ScheduleItem} from '../domains/ScheduleItem';
import {Manager} from '../domains/manager.model';
import {ShowedManager} from '../domains/showed-manager';
import {FirebaseService} from './firebase.service';
import {ClientsAndRecOrdersCount} from '../domains/clients-recOrderc-count';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private httpService: HttpService, private fb: FirebaseService) { }

  convertIntoShowManagers(schedules: ScheduleItem[], managers: Manager[]): ShowedManager[] {
    const showedManagers: ShowedManager[] = [];
    managers.forEach((item, index) => {
      showedManagers.push(new ShowedManager(index + 1, item.name, item.unitName, item.id,
                              this.getClientsAndRecOrdersCount(schedules, item.id, 'Monday'),
                              this.getClientsAndRecOrdersCount(schedules, item.id, 'Tuesday'),
                              this.getClientsAndRecOrdersCount(schedules, item.id, 'Wednesday'),
                              this.getClientsAndRecOrdersCount(schedules, item.id, 'Thursday'),
                              this.getClientsAndRecOrdersCount(schedules, item.id, 'Friday'),
                              this.getClientsAndRecOrdersCount(schedules, item.id, 'AnyDay')));
    });
    return showedManagers;
  }

  getClientsCount(schedules: ScheduleItem[], id: string, day: string): number {
    let len: number;
    const result = schedules.filter(item => {
      return item.managerId === id;
    });
    result.forEach(i => {
      len = i[day].length;
    });
    return len;
  }

  getClientsAndRecOrdersCount(schedules: ScheduleItem[], id: string, day: string): ClientsAndRecOrdersCount {
    const clientsCount = this.getClientsCount(schedules, id, day);
    return new ClientsAndRecOrdersCount(clientsCount, 0);
  }
}

// 35c200fa-d381-11e3-aaf8-00259069f1e5
