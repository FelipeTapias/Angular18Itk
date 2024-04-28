import { EventEmitter, Injectable } from '@angular/core';
import { ProductOrderEvent } from 'src/app/products/pages/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  $shopping = new EventEmitter<boolean>();
  $temporalOrders = new EventEmitter<ProductOrderEvent[]>();
  $completeOrderAction = new EventEmitter<true>();

}
