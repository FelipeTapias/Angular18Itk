import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list/service/shopping-list.service';
import { UserService } from 'src/app/user/services/user.service';
import { StorageService } from '../services/storage.service';
import { FloatButtonService } from './service/float-button.service';
import { ITEM_NAME } from '../services/storage.model';
import { ProductOrderEvent } from 'src/app/products/pages/models/product.interface';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss']
})
export class FloatButtonComponent implements AfterContentInit{
  @ViewChild('floatButton', { static: false }) floatButton!: ElementRef;
  @Input() buttonPosition!: string;
  @Input() buttonIcon!: string;
  @Input() typeAction!: string;
  @Input() conditionShow!: string;
  @Input() showSubButton!: boolean;
  temporalOrders!: ProductOrderEvent[];
  countOrder: number = 0;

  constructor(
    private shoppingListService: ShoppingListService,
    private userService: UserService,
    private storageService: StorageService,
    private floatButtonService: FloatButtonService) { }
  
  ngAfterContentInit(): void {
    this.getShowButton();
  }

  action() {
    switch (this.typeAction) {
      case 'shopping-list':
        this.shoppingListService.$temporalOrders.next(JSON.parse(this.storageService.getItem(ITEM_NAME.temporalOrders)));
        this.shoppingListService.$shopping.next(true);
        this.floatButtonService.$showButton.emit(false);
        break;
      case 'call':
        console.log('Llamando mesero');
        break;
      default:
        break;
    }
  }

  getShowButton() {
    switch (this.conditionShow) {
      case 'userExist':
        this.userService.$usuario.subscribe(data => {
          this.floatButton.nativeElement.style.display = data ? 'block' : 'none';
        });
        this.floatButtonService.$showButton.subscribe(data => {
          this.floatButton.nativeElement.style.display = data ? 'block' : 'none';
        });
        this.temporalOrders = JSON.parse(this.storageService.getItem(ITEM_NAME.temporalOrders));
        this.temporalOrders.forEach(order => {
          this.countOrder += order.quantity;
        });
        this.floatButtonService.$countOrders.subscribe(data => {
          this.countOrder = 0;
          this.temporalOrders = JSON.parse(this.storageService.getItem(ITEM_NAME.temporalOrders));
          this.temporalOrders.forEach(order => {
            this.countOrder += order.quantity;
          });
        });
        break;
      default:

        break;
    }
  }
}
