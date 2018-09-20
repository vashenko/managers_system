import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {ScheduleItem} from '../domains/ScheduleItem';
import {Manager} from '../domains/manager.model';
import {ShowedManager} from '../domains/showed-manager';
import {ClientsAndRecOrdersCount} from '../domains/clients-recOrderc-count';
import {DateService} from './date-service.service';
import {RecommendedOrders} from '../domains/recomendedOrder.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private httpService: HttpService, private date: DateService) { }

  convertIntoShowManagers(schedules: ScheduleItem[], managers: Manager[], recOrders: RecommendedOrders[]): ShowedManager[] {
    console.log(recOrders);
    const showedManagers: ShowedManager[] = [];
    managers.forEach((item, index) => {
      showedManagers.push(new ShowedManager(index + 1, item.name, item.unitName, item.id,
                              this.getClientsAndRecOrdersCount(schedules, item.id, this.date.getMonday()),
                              this.getClientsAndRecOrdersCount(schedules, item.id, this.date.getTuesday()),
                              this.getClientsAndRecOrdersCount(schedules, item.id, this.date.getWednesday()),
                              this.getClientsAndRecOrdersCount(schedules, item.id, this.date.getThursday()),
                              this.getClientsAndRecOrdersCount(schedules, item.id, this.date.getWednesday()),
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
      return len = i[day].length;
    });
    return len;
  }

  getClientsAndRecOrdersCount(schedules: ScheduleItem[], id: string, day: string): ClientsAndRecOrdersCount {
    const clientsCount = this.getClientsCount(schedules, id, day);
    return new ClientsAndRecOrdersCount(clientsCount, 0);
  };
}

