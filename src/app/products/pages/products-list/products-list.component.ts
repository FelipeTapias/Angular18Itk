import { Component, OnDestroy } from '@angular/core';
import { DetailSelection, Product, ProductOrderEvent } from '../models/product.interface';
import { ModalService } from 'src/app/shared/modal/sevices/modal.service';
import { ModalNotifiactionService } from 'src/app/shared/modal-notification/services/modal-notifiaction.service';
import { ConfiguratorService } from '../../configuratorServices/configurator.service';
import { Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { CategorySelectedService } from '../../configuratorServices/category-selected.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SessionService } from '../../sessionServices/session.service';
import { NotificationConfig } from 'src/app/shared/modal-notification/models/modal-notification.model';
import { ShoppingListService } from 'src/app/shared/shopping-list/service/shopping-list.service';
import { FloatButtonService } from 'src/app/shared/float-button/service/float-button.service';
import { ITEM_NAME } from 'src/app/shared/services/storage.model';
import { CartMaganerService } from 'src/app/shared/shopping-list/service/cart-maganer.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnDestroy{

  private ngUnsubscribe = new Subject();
  products: Product[] = [];
  product!: Product;
  orderProductBody!: ProductOrderEvent;
  orderDetails!: DetailSelection[];
  quantity!: number;
  productsList$!: Observable<Product[]>;
  modalSwitch!: boolean;
  modalNotificationSwitch!: boolean;
  modalNotificationSuccessSwitch!: boolean;
  notificationConfig!: NotificationConfig

  constructor(
    private modalService: ModalService, 
    private notificatioService: ModalNotifiactionService,
    private configuratorService: ConfiguratorService,
    private categorySelectedService: CategorySelectedService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private shoppingListService: ShoppingListService,
    private floatButtonService: FloatButtonService,
    private cartMaganerService: CartMaganerService) {}

  ngOnInit(): void {
    this.modalService.$modal.subscribe(_ => this.modalSwitch = _);
    this.notificatioService.$modalNotifiactions.subscribe(_ => this.modalNotificationSwitch = _);
    this.notificatioService.$modalNotifiactions.subscribe(_ => this.modalNotificationSuccessSwitch = _);
    this.getProductsByCode(this.storageService.getItem(ITEM_NAME.category) ? this.storageService.getItem(ITEM_NAME.category) : 'Recomendados');
    this.shoppingListService.$completeOrderAction.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(data => {
      data ? this.completeOrder() : null;
    });
    this.categorySelectedService.category$.subscribe(data => {
      this.storageService.setItem(ITEM_NAME.category, data.code);
      this.getProductsByCode(data.code);
    })
  }

  openModal(product: Product) {
    this.modalSwitch = true;
    this.product = product;
  }

  orderProduct() {
    this.cartMaganerService.postOrder(this.orderProductBody);
    this.orderProductFinalize();
  }

  completeOrder() {
    this.sessionService.postOrderProduct(this.cartMaganerService.getAllOrders()).subscribe({
      next: () => this.orderProductComplete(),
      error: () => this.orderProductoError()
    }); 
  }

  orderProductConfirm(orderEvent: ProductOrderEvent) {
    this.orderProductBody = {
      idOrder: uuid.v4(),
      quantity: orderEvent.quantity,
      product: orderEvent.product,
      details: orderEvent.details
    }

    this.modalSwitch = false;
    this.notificationConfig = this.getNotificationConfig(
      'Confirmar pedido',
      `¿Estás seguro que deseas agregar ${this.orderProductBody.quantity} ${this.orderProductBody.product.name} a tu carrito?
      `,
      'Confirmar',
      true
       );
    this.modalNotificationSwitch = true;
  }

  orderProductFinalize() {
    this.floatButtonService.$countOrders.emit(true);
    this.modalSwitch = false;
    this.modalNotificationSwitch = false;
    this.notificationConfig = this.getNotificationConfig(
      'Pedido agregado',
      'Gracias por confirmar tu pedido, puedes visualizar tu carrito para ver todas tus ordenes.',
      'Aceptar',
      false
       );
    this.modalNotificationSuccessSwitch = true;
  }

  orderProductComplete() {
    this.shoppingListService.$shopping.emit(false);
    this.floatButtonService.$showButton.emit(true);
    this.modalSwitch = false;
    this.modalNotificationSwitch = false;
    this.notificationConfig = this.getNotificationConfig(
      'Pedido ordenado',
      'Gracias por pedir tu pedido',
      'Aceptar',
      false
       );
    this.cartMaganerService.deleteAllOrders();
    this.floatButtonService.$countOrders.emit(false);
    this.modalNotificationSuccessSwitch = true;
  }

  orderProductoError() {
    this.modalSwitch = false;
    this.modalNotificationSwitch = false;
    this.notificationConfig = this.getNotificationConfig(
      'Sesión Cerrada',
      'Para más información comunicate con el mesero.',
      'Aceptar',
      false
       );
    this.modalNotificationSuccessSwitch = true;
  }

  openNotifications() {
    this.modalNotificationSwitch = true;
  }

  getProductsByCode(category: string | null) {
    this.productsList$ = this.configuratorService.getProductsByCode(category)
        .pipe(
          map(data => {
            this.products = data;
            return data
          }),
          catchError(_ => {
            this.products = [];
            return of([])
          }));
  }

  getNotificationConfig(title: string, description: string, butonDetail: string, showButton: boolean): NotificationConfig {
    return {
      title: title,
      description: description,
      butonDetail: butonDetail,
      showButton: showButton
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

}
