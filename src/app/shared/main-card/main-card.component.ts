import { Component, Input } from '@angular/core';
import { Product } from 'src/app/products/pages/models/product.interface';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent   {

  @Input() product!: Product;
 
}
