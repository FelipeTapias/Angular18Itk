import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from './sevices/modal.service';
import { Detail, DetailSelection, Product, ProductOrderEvent } from 'src/app/products/pages/models/product.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() product!: Product;
  @Output() orderProduct = new EventEmitter();
  productOrderEvent!: ProductOrderEvent;
  amount: number = 1;
  extras: DetailSelection[] = [];

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    if (this.product?.details != null) {
      this.product.details.forEach(d => this.extras.push({ name: '', code: '', cost: 0 }));
    }
  }

  closeModal() {
    this.modalService.$modal.emit(false);
  }

  ngAfterViewInit() {
    const summaries = document.querySelectorAll('summary');
    const inputs = document.querySelectorAll('input');

    summaries.forEach((summary) => {
      summary.addEventListener('click', function(e){
        summaries.forEach((summary) => {
          const detail = <HTMLDetailsElement>(summary.parentNode);
          if (detail != this.parentNode) {
            detail.removeAttribute('open');
          }
          })
      })
    })

    inputs.forEach((input) => {
      input.addEventListener('click', function(e){
        summaries.forEach((summary) => {
          const detail = <HTMLDetailsElement>(summary.parentNode);
          if (detail != this.parentNode) {
            detail.removeAttribute('open');
          }
          })
      })
    })
  }

  addProduct() {
    this.amount++;
  }

  removeProduct() {
    (this.amount == 1) ? null : this.amount--;
  }

  changeDetail(index: number, name: string, value: Detail) {
    this.extras[index] = {name: name, code: value.code, cost: value.cost};
    document.getElementById(index.toString())!.innerText = value.code;
  }

  orderProductModal() {
    this.productOrderEvent = {
      product: this.product,
      quantity: this.amount,
      details: this.extras
    };

    this.orderProduct.emit(this.productOrderEvent);
  }

  
}
