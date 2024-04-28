import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsBillComponent } from './pages/products-bill/products-bill.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-productos', component: ProductsListComponent },
      { path: 'mis-compras', component: ProductsBillComponent },
      { path: '**', redirectTo: 'lista-productos' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProductsRoutingModule { }
