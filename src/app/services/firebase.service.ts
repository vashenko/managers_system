import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecommendedOrders } from '../domains/recomendedOrder.model';
import { OrderedProducts } from '../domains/OrderedProducts.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFireDatabase) {}

  getRecommendedOrdersByUser1cId(user1cId: string): number {
    const result = this.getRecommendedOrders().filter(recOrd => {
      return recOrd.user1cId === user1cId;
    });
    return result.length;
  }

  getRecommendedOrders(): RecommendedOrders[] {
    const recommendedOrders: RecommendedOrders[] = [];
    this.firebase.list('/partnerPointRecommendedOrders')
      .valueChanges()
      .subscribe(res => {
        res.forEach(item => {
          recommendedOrders.push(
            new RecommendedOrders(item['creationDate'], this.getOrderedProducts(item['orderProducts']), item['user1cId'], item['status']));
        });
      });
    return recommendedOrders;
  }

  getOrderedProducts(Products: {}): OrderedProducts[] {
    const orderedProducts: OrderedProducts[] = [];
    for (const val in Products) {
      orderedProducts.push(new OrderedProducts(Products[val].count, Products[val].price, Products[val].summarycode));
    }
    return orderedProducts;
  }
}
