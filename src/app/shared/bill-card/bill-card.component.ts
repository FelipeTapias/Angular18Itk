import { Component, Input } from '@angular/core';
import { OrderBill } from 'src/app/products/pages/models/product.interface';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})


export class BillCardComponent {
  @Input() order!: OrderBill;
}
