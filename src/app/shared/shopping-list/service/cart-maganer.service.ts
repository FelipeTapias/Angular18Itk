import { Injectable } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Product, ProductOrderEvent } from 'src/app/products/pages/models/product.interface';
import { ITEM_NAME } from '../../services/storage.model';
import { ShoppingListService } from './shopping-list.service';
import { FloatButtonService } from '../../float-button/service/float-button.service';

@Injectable({
  providedIn: 'root'
})
export class CartMaganerService {

  temporalOrders: ProductOrderEvent[] = [];
  orderIndex: number = -1;
  order!: ProductOrderEvent;

  constructor(private storageService: StorageService,
    private shoppingListService: ShoppingListService,
    private floatButtonService: FloatButtonService
  ) { }

  getAllOrders(): ProductOrderEvent[] {
    return JSON.parse(this.storageService.getItem(ITEM_NAME.temporalOrders));
  }

  postOrder(product: ProductOrderEvent) {
    this.order = this.searchProduct(product);
    if(this.order) {
      this.order.quantity += product.quantity;
      this.deleteWholeOrder(this.order.idOrder);
      this.temporalOrders.push(this.order);
    } else {
      this.temporalOrders.push(product);
    }
    this.storageService.setItem(ITEM_NAME.temporalOrders, JSON.stringify(this.temporalOrders));
  }

  deleteWholeOrder(idOrder: string | undefined) {
    this.temporalOrders = JSON.parse(this.storageService.getItem(ITEM_NAME.temporalOrders));
    this.orderIndex = this.temporalOrders.findIndex(_ => _.idOrder == idOrder)

    if(this.orderIndex >= 0) {
      this.temporalOrders.splice(this.orderIndex, 1);
    }

    this.storageService.setItem(ITEM_NAME.temporalOrders, JSON.stringify(this.temporalOrders));
    this.shoppingListService.$temporalOrders.next(JSON.parse(this.storageService.getItem(ITEM_NAME.temporalOrders)));
    this.floatButtonService.$countOrders.next(true);
  }

  deleteAllOrders() {
    this.storageService.setItem(ITEM_NAME.temporalOrders, JSON.stringify([]));
  }

  private comparerJson(jsonOne: any, jsonTwo: any) {
    return JSON.stringify(jsonOne) === JSON.stringify(jsonTwo);
  }

  private searchProduct(product: ProductOrderEvent): ProductOrderEvent  {
    let x!: ProductOrderEvent;
    this.temporalOrders = JSON.parse(this.storageService.getItem(ITEM_NAME.temporalOrders));
    for (let i = 0; i < this.temporalOrders.length; i++) {
      if (this.comparerJson(this.temporalOrders[i].product, product.product) && this.comparerJson(this.temporalOrders[i].details, product.details)) {
        console.log(this.temporalOrders[i]);
        return this.temporalOrders[i]; 
      }
    }
    return x; 
  }

}
