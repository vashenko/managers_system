import {Injectable} from '@angular/core';
import {Manager} from '../domains/manager.model';
import {ScheduleItem} from '../domains/ScheduleItem';
import {ManagerClient} from '../domains/client.modetl';
import {DateService} from './date-service.service';
import {OrderedProducts} from '../domains/OrderedProducts.model';
import {RecommendedOrders} from '../domains/recomendedOrder.model';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor(private date: DateService) {
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
        item['managerId'],
        this.getClientsByDay(item[this.date.getMonday().split(', ')[0]]),
        this.getClientsByDay(item[this.date.getTuesday().split(', ')[0]]),
        this.getClientsByDay(item[this.date.getWednesday().split(', ')[0]]),
        this.getClientsByDay(item[this.date.getThursday().split(', ')[0]]),
        this.getClientsByDay(item[this.date.getFriday().split(', ')[0]]),
        this.getClientsByDay(item['AnyDay']))));
    return result;
  }

  getClientsByDay(ClientsArray: {}): ManagerClient[] {
    const clients: ManagerClient[] = [];
    for (const v in ClientsArray) {
      clients.push(new ManagerClient(ClientsArray[v].clientName, ClientsArray[v].clientId));
    }
    return clients;
  }

  intoRecommendedOrders(res, result): RecommendedOrders[] {
    res.forEach(item => {
      result.push(new RecommendedOrders(this.date.transfromIntoStringDate(item['creationDate']),
                                        this.getOrderedProducts(item['orderProducts']),
                                        item['user1cId']));
    });
    return result;
  }

  getOrderedProducts(Products: {}): OrderedProducts[] {
    const orderedProducts: OrderedProducts[] = [];
    for (const val in Products) {
      orderedProducts.push(new OrderedProducts(Products[val].count,
                                               Products[val].price,
                                               Products[val].summarycode));
    }
    return orderedProducts;
  }
}
