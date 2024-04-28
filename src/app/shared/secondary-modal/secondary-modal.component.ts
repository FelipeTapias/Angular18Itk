import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Detail, DetailSelection, ProductOrderEvent } from 'src/app/products/pages/models/product.interface';
import { SecondaryModalService } from './services/secondary-modal.service';

@Component({
  selector: 'app-secondary-modal',
  templateUrl: './secondary-modal.component.html',
  styleUrls: ['./secondary-modal.component.scss']
})
export class SecondaryModalComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input() product!: ProductOrderEvent;
  @Output() orderProduct = new EventEmitter();
  productOrderEvent!: ProductOrderEvent;
  amount!: number;
  extras: DetailSelection[] = [];
  modalSwitch!: boolean;

  constructor(private secondaryModalService: SecondaryModalService) { }

  ngOnInit(): void {
    this.secondaryModalService.$modal.subscribe(_ => this.modalSwitch = _);
    if (this.product?.details != null) {
      for(let i = 0; i < this.product.details.length; i++){
        let selection = this.product.details[i];
        this.extras.push({name: selection.name, code:selection.code, cost: selection.cost});      }
    }
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

    // Mostrar los detalles seleccionados
    if (this.product?.details != null) {
      for(let i = 0; i < this.product.details.length; i++){
        let selection = this.product.details[i];
        this.extras.push({name: selection.name, code:selection.code, cost: selection.cost});
        document.getElementById(i.toString())!.innerText = selection.code;
      }
    }
  }
  
  ngAfterContentInit(): void {
    this.amount = this.product.quantity;
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
    // this.productOrderEvent = {
    //   product: this.product,
    //   quantity: this.amount,
    //   details: this.extras
    // };

    // this.orderProduct.emit(this.productOrderEvent);
  }

  closeModal() {
    this.secondaryModalService.$modal.emit(false);
  }

  
}
