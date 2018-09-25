import { Injectable } from '@angular/core';
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

  constructor(private date: DateService) { }

  convertIntoShowManagers(schedules: ScheduleItem[], managers: Manager[], recOrders: RecommendedOrders[]): ShowedManager[] {
    const showedManagers: ShowedManager[] = [];
    managers.forEach((item, index) => {
      showedManagers.push(new ShowedManager(index + 1, item.name, item.unitName, item.id,
                              this.getClientsAndRecOrdersCount(schedules, recOrders, item.id, item.user1cId, this.date.getMonday()),
                              this.getClientsAndRecOrdersCount(schedules, recOrders, item.id, item.user1cId, this.date.getTuesday()),
                              this.getClientsAndRecOrdersCount(schedules, recOrders, item.id, item.user1cId, this.date.getWednesday()),
                              this.getClientsAndRecOrdersCount(schedules, recOrders, item.id, item.user1cId, this.date.getThursday()),
                              this.getClientsAndRecOrdersCount(schedules, recOrders, item.id, item.user1cId, this.date.getFriday()),
                              this.getClientsAndRecOrdersCount(schedules, recOrders, item.id, item.user1cId, 'AnyDay')));
    });
    return showedManagers;
  }

  getClientsAndRecOrdersCount(schedules: ScheduleItem[], recOrders: RecommendedOrders[], id: string, user1cid: string, day: string): ClientsAndRecOrdersCount {
    const clientsCount = this.getClientsCount(schedules, id, day);
    const recOrdersCount = this.getRecOrdersCount(recOrders, user1cid, day);
    return new ClientsAndRecOrdersCount(clientsCount, recOrdersCount);
  }

  getClientsCount(schedules: ScheduleItem[], id: string, date: string): number {
    let len: number;
    const weekDay = date.split(', ')[0];
    const result = schedules.filter(item => {
      return item.managerId === id;
    });
    result.forEach(i => {
      return len = i[weekDay].length;
    });
    if (len) {
      return len;
    } else {
      return 0;
    }
  }

  getRecOrdersCount(recommendedOrders: RecommendedOrders[], user1cId: string, day: string) {
    const result = recommendedOrders.filter(item => {
      return item.user1cId === user1cId && item.creationDate === day;
    });
    return result.length;
  }
}

