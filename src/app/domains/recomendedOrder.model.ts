import {OrderedProducts} from './ordered-products.model';

export class RecommendedOrders {
  constructor(public creationDate: string, public orderProducts: OrderedProducts[], public user1cId: string) {
  }
}
