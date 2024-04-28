import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from './service/shopping-list.service';
import { StorageService } from '../services/storage.service';
import { ProductOrderEvent } from 'src/app/products/pages/models/product.interface';
import { FloatButtonService } from '../float-button/service/float-button.service';
import { ITEM_NAME } from '../services/storage.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements AfterViewInit {
  @ViewChild('myCheckShopping', { static: false }) myCheck!: ElementRef;
  userName!: string | null;
  temporalOrders: ProductOrderEvent[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private storageService: StorageService,
    private floatButtonService: FloatButtonService) {
    this.userName = this.storageService.getItem(ITEM_NAME.user);
    this.shoppingListService.$temporalOrders.subscribe(orders => {
      this.temporalOrders = orders;
    });
  }

  ngAfterViewInit(): void {
    this.shoppingListService.$shopping.subscribe(data => {
      this.myCheck.nativeElement.checked = data;
      this.userName = this.storageService.getItem(ITEM_NAME.user);
    });
  }

  completeOrder() {
    this.shoppingListService.$completeOrderAction.emit(true);
  }

  closeMenu() {
    this.floatButtonService.$showButton.emit(true);
    this.myCheck.nativeElement.checked = false;
  }
}
