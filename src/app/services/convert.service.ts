import {Injectable} from '@angular/core';
import {Manager} from '../domains/manager.model';
import {ScheduleItem} from '../domains/scheduleItem';
import {ManagerClient} from '../domains/client.modetl';
import {DateService} from './date.service';
import {OrderedProducts} from '../domains/ordered-products.model';
import {RecommendedOrders} from '../domains/recomendedOrder.model';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor(private date: DateService) {
  }

  static getClientsByWeekDay(clientsArray: Object): ManagerClient[] {
    const clients: ManagerClient[] = [];
    for (const v in clientsArray) {
      clients.push(new ManagerClient(clientsArray[v].clientName, clientsArray[v].clientId));
    }
    return clients;
  }

  static getOrderedProducts(products: Object): OrderedProducts[] {
    const orderedProducts: OrderedProducts[] = [];
    for (const val in products) {
      orderedProducts.push(new OrderedProducts(products[val].count, products[val].price, products[val].summarycode));
    }
    return orderedProducts;
  }

  public intoManagers(res: Object[]): Manager[] {
    const managers: Manager[] = [];
    res.forEach(item => {
      managers.push(new Manager(item['active'], item['directionId'], item['directionName'], item['email'], item['headId'],
        item['headName'], item['managerId'], item['managerName'], item['salesManager'], item['unitId'],
        item['unitName'], item['user1cId'], item['user1cName']));
    });
    return managers.filter(manager => {
      return manager.active === true;
    });
  }

  public intoScheduleItems(res: Object[]): ScheduleItem[] {
    const schedules: ScheduleItem[] = [];
    res.forEach(item => schedules.push(
      new ScheduleItem(
        item['managerId'],
        ConvertService.getClientsByWeekDay(item[this.date.Monday.split(', ')[0]]),
        ConvertService.getClientsByWeekDay(item[this.date.Tuesday.split(', ')[0]]),
        ConvertService.getClientsByWeekDay(item[this.date.Wednesday.split(', ')[0]]),
        ConvertService.getClientsByWeekDay(item[this.date.Thursday.split(', ')[0]]),
        ConvertService.getClientsByWeekDay(item[this.date.Friday.split(', ')[0]]),
        ConvertService.getClientsByWeekDay(item['AnyDay']))));
    return schedules;
  }

  public intoRecommendedOrders(res: Object[], result: RecommendedOrders[]): RecommendedOrders[] {
    res.forEach(item => {
      result.push(new RecommendedOrders(this.date.transfromIntoStringDate(item['creationDate']),
                                        ConvertService.getOrderedProducts(item['orderProducts']),
                                        item['user1cId']));
    });
    return result;
  }
}
