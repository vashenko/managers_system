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

  private getTotalClientsCountByWeekDay(managers: ShowedManager[], date: string): number {
    const weekDay = date.split(', ')[0];
    let clientsCount = 0;
    managers.forEach(manager => clientsCount += manager[weekDay].clientsCount);
    return clientsCount;
  }

  private getTotalOrdersCountByWeekDay(managers: ShowedManager[], date: string): number {
    const weekDay = date.split(', ')[0];
    let recOrdersCount = 0;
    managers.forEach(manager =>  recOrdersCount += manager[weekDay].recOrdersCount);
    return recOrdersCount;
  }

  private getClientsAndOrdersSummaryByWeekDay(managers: ShowedManager[], date: string): ClientsAndOrdersSummary {
    const clientsSummary = this.getTotalClientsCountByWeekDay(managers, date);
    const ordersSummary = this.getTotalOrdersCountByWeekDay(managers, date);
    return new ClientsAndOrdersSummary(clientsSummary, ordersSummary);
  }

  public getSubdivisions(managers: ShowedManager[], key: string): Subdivision[] {
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
                                  this.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Monday),
                                  this.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Tuesday),
                                  this.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Wednesday),
                                  this.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Thursday),
                                  this.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], this.date.Friday),
                                  this.getClientsAndOrdersSummaryByWeekDay(groupedCollection[direction], 'AnyDay')));
    });
    return subdivisions;
  }
}
