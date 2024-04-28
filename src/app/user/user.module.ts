import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialFormComponent } from './pages/initial-form/initial-form.component';
import { UserRotuingModule } from './user-rotuing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InitialFormComponent
  ],
  imports: [
    CommonModule,
    UserRotuingModule,
    ReactiveFormsModule
  ],
  exports: [
    InitialFormComponent
  ]
})
export class UserModule { }
