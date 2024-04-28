import { Component, OnInit } from '@angular/core';
import { OrderResponse, SummaryBill } from '../models/product.interface';
import { SessionService } from '../../sessionServices/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CategorySelectedService } from '../../configuratorServices/category-selected.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ITEM_NAME } from 'src/app/shared/services/storage.model';

@Component({
  selector: 'app-products-bill',
  templateUrl: './products-bill.component.html',
  styleUrls: ['./products-bill.component.scss']
})
export class ProductsBillComponent implements OnInit {
  
  summary!: SummaryBill;
  productsList$!: Observable<OrderResponse>;
  
  constructor(
    private sessionService: SessionService, 
    private storageService: StorageService,
    private categorySelectedService: CategorySelectedService,
    private router: Router){ }

  ngOnInit(): void {
    const sessionId = this.storageService.getItem(ITEM_NAME.session);

    this.productsList$ = this.sessionService.getSummary(sessionId ? sessionId : "")
      .pipe(
        map(summary => {
          this.summary = summary.contentResult;
          return summary
        })
      )

    this.categorySelectedService.category$.subscribe(_ => {
      this.router.navigate(['productos/lista-productos']);
    });
  }
}
