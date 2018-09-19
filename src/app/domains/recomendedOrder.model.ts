import {OrderedProducts} from './OrderedProducts.model';

export class RecommendedOrders {
  constructor(public creationDate: string, public orderProducts: OrderedProducts[], public user1cId: string, public status: string) {
  }
}
