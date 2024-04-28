import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard.guard';

const routes: Routes = [
  { 
    path: 'productos', 
    canActivate: [authGuardGuard],
    loadChildren: () => import('./products/products.module')
      .then(m => m.ProductsModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  },
  { 
    path: '**',
    redirectTo: 'usuario'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
