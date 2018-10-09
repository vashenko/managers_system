import { Injectable } from '@angular/core';
import {DateService} from './date.service';
import {ShowedManager} from '../domains/showed-manager';
import {Subdivision} from '../domains/subdivision.model';
import {ClientsAndOrdersSummary} from '../domains/clients-and-orders-summary.model';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {

  constructor(private date: DateService) { }

  static getTotalClientsCountByWeekDay(managers: ShowedManager[], date: string): number {
    const weekDay = date.split(', ')[0];
    let clientsCount = 0;
    managers.forEach(manager => clientsCount += manager[weekDay].clientsCount);
    return clientsCount;
  }

  static getTotalOrdersCountByWeekDay(managers: ShowedManager[], date: string) {
    const weekDay = date.split(', ')[0];
    let recOrdersCount = 0;
    managers.forEach(manager =>  recOrdersCount += manager[weekDay].recOrdersCount);
    return recOrdersCount;
  }

  static getClientsAndOrdersSummaryByWeekDay(managers: ShowedManager[], date: string) {
    const clientsSummary = this.getTotalClientsCountByWeekDay(managers, date);
    const ordersSummary = this.getTotalOrdersCountByWeekDay(managers, date);
    return new ClientsAndOrdersSummary(clientsSummary, ordersSummary);
  }

  getSubdivisions(managers: ShowedManager[], key: string) {
    const subdivisions: Subdivision[] = [];
    if (!managers) {
      return null;
    }
    const groupedCollection = managers.reduce((previous, current) => {
      if (!previous[current[key]]) {
        previous[current[key]] = [current];
      } else {
        previous[current[key]].push(current);
      }
      return previous;
    }, {});

    Object.keys(groupedCollection).map(direction => {
      subdivisions.push(new Subdivision(
                                  direction, groupedCollection[direction],
                                  SubdivisionService.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Monday),
                                  SubdivisionService.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Tuesday),
                                  SubdivisionService.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Wednesday),
                                  SubdivisionService.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Thursday),
                                  SubdivisionService.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Friday),
                                  SubdivisionService.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], 'AnyDay')));
    });
    return subdivisions;
  }
}
