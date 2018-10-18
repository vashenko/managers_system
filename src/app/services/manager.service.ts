import { Injectable } from '@angular/core';
import {ScheduleItem} from '../domains/scheduleItem';
import {Manager} from '../domains/manager.model';
import {ShowedManager} from '../domains/showed-manager';
import {ClientsAndRecOrdersCount} from '../domains/clients-recOrderc-count';
import {DateService} from './date.service';
import {RecommendedOrders} from '../domains/recomendedOrder.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private date: DateService) { }

  static getClientsAndRecOrdersCount(schedules: ScheduleItem[], recOrders: RecommendedOrders[],
                                     id: string, user1cid: string, day: string): ClientsAndRecOrdersCount {
    const clientsCount = this.getClientsCount(schedules, id, day);
    const recOrdersCount = this.getRecOrdersCount(recOrders, user1cid, day);
    return new ClientsAndRecOrdersCount(clientsCount, recOrdersCount);
  }

  static getClientsCount(schedules: ScheduleItem[], id: string, date: string): number {
    let len: number;
    const weekDay = date.split(', ')[0];
    schedules.filter(item => {
      return item.managerId === id;
    }).forEach(i => {
      return len = i[weekDay].length;
    });
    return len ? len : 0;
  }

  static getRecOrdersCount(recommendedOrders: RecommendedOrders[], user1cId: string, day: string): number {
    const result = recommendedOrders.filter(item => {
      return item.user1cId === user1cId && item.creationDate === day;
    });
    return result.length;
  }

  public convertIntoShowedManagers(schedules: ScheduleItem[], managers: Manager[], recOrders: RecommendedOrders[]): ShowedManager[] {
    const showedManagers: ShowedManager[] = [];
    managers.forEach(manager => {
      showedManagers.push(
                        new ShowedManager(
                        manager.name, manager.unitName, manager.id,
                        ManagerService.getClientsAndRecOrdersCount(schedules, recOrders, manager.id, manager.user1cId, this.date.Monday),
                        ManagerService.getClientsAndRecOrdersCount(schedules, recOrders, manager.id, manager.user1cId, this.date.Tuesday),
                        ManagerService.getClientsAndRecOrdersCount(schedules, recOrders, manager.id, manager.user1cId, this.date.Wednesday),
                        ManagerService.getClientsAndRecOrdersCount(schedules, recOrders, manager.id, manager.user1cId, this.date.Thursday),
                        ManagerService.getClientsAndRecOrdersCount(schedules, recOrders, manager.id, manager.user1cId, this.date.Friday),
                        ManagerService.getClientsAndRecOrdersCount(schedules, recOrders, manager.id, manager.user1cId, 'AnyDay')));
    });
    return showedManagers;
  }

}

