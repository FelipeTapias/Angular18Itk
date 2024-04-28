import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductOrderEvent } from 'src/app/products/pages/models/product.interface';
import { CartMaganerService } from '../shopping-list/service/cart-maganer.service';
import { SecondaryModalService } from '../secondary-modal/services/secondary-modal.service';

@Component({
  selector: 'app-secondary-card',
  templateUrl: './secondary-card.component.html',
  styleUrls: ['./secondary-card.component.scss']
})
export class SecondaryCardComponent implements OnInit, AfterViewInit {

  @Input() product!: ProductOrderEvent;
  detailsOrder: string[] = [];
  modalSwitch!: boolean;

  constructor(
    private cartMaganerService: CartMaganerService,
    private secondaryModalService: SecondaryModalService) {}

  ngOnInit(): void {
    this.secondaryModalService.$modal.subscribe(_ => this.modalSwitch = _);
  }

  ngAfterViewInit(): void { 
    this.showDetails();
  }

  editOrder(product: ProductOrderEvent) {
    console.log(product);
    this.modalSwitch = true;
  }

  deleteOrder(idOrder: string | undefined) {
    this.cartMaganerService.deleteWholeOrder(idOrder);
  }

  private showDetails() {
    for (let index = 0; index < this.product.details.length; index++) {
      this.detailsOrder.push(this.product.details[index].code)+" ";
    }
  }
}
