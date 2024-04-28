import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './http/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class CoreModule { }
