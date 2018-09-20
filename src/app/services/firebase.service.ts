import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrderedProducts } from '../domains/OrderedProducts.model';
import {ConvertService} from './convert.service';
import {RecommendedOrders} from '../domains/recomendedOrder.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFireDatabase, private convert: ConvertService) {}

}
