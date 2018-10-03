import { Injectable } from '@angular/core';
import {DateService} from './date.service';
import {ShowedManager} from '../domains/showed-manager';
import {GroupedByDirection} from '../domains/grouped-direction.model';

@Injectable({
  providedIn: 'root'
})
export class GroupedDataService {

  constructor(private date: DateService) { }

  GroupByDirectionData(managers: ShowedManager[], key: string) {
    const groupedByDirection: GroupedByDirection[] = [];
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
      groupedByDirection.push(new GroupedByDirection(
                                  direction, groupedCollection[direction],
                                  this.getTotalClientsCountByWeekDay(groupedCollection[direction], this.date.Monday),
                                  this.getTotalClientsCountByWeekDay(groupedCollection[direction], this.date.Tuesday),
                                  this.getTotalClientsCountByWeekDay(groupedCollection[direction], this.date.Wednesday),
                                  this.getTotalClientsCountByWeekDay(groupedCollection[direction], this.date.Thursday),
                                  this.getTotalClientsCountByWeekDay(groupedCollection[direction], this.date.Friday),
                                  this.getTotalClientsCountByWeekDay(groupedCollection[direction], 'AnyDay'),
                                  this.getTotalOrdersCountByWeekDay(groupedCollection[direction], this.date.Monday),
                                  this.getTotalOrdersCountByWeekDay(groupedCollection[direction], this.date.Tuesday),
                                  this.getTotalOrdersCountByWeekDay(groupedCollection[direction], this.date.Wednesday),
                                  this.getTotalOrdersCountByWeekDay(groupedCollection[direction], this.date.Thursday),
                                  this.getTotalOrdersCountByWeekDay(groupedCollection[direction], this.date.Friday),
                                  this.getTotalOrdersCountByWeekDay(groupedCollection[direction], 'AnyDay')));
    });
    return groupedByDirection;
  }

  getTotalClientsCountByWeekDay(managers: ShowedManager[], date: string): number {
    const weekDay = date.split(', ')[0];
    let clientsCount = 0;
    managers.forEach(manager => clientsCount += manager[weekDay].clientsCount);
    return clientsCount;
  }

  getTotalOrdersCountByWeekDay(managers: ShowedManager[], date: string) {
    const weekDay = date.split(', ')[0];
    let recOrdersCount = 0;
    managers.forEach(manager =>  recOrdersCount += manager[weekDay].recOrdersCount);
    return recOrdersCount;
  }
}
