import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsBillComponent } from './pages/products-bill/products-bill.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsBillComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
