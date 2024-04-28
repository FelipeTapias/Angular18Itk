import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { MainCardComponent } from './main-card/main-card.component';
import { RouterModule } from '@angular/router';
import { BillCardComponent } from './bill-card/bill-card.component';
import { ModalComponent } from './modal/modal.component';
import { ModalNotificationComponent } from './modal-notification/modal-notification.component';
import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { EmptyContentComponent } from './empty-content/empty-content.component';
import { FloatButtonComponent } from './float-button/float-button.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SecondaryCardComponent } from './secondary-card/secondary-card.component';
import { SecondaryModalComponent } from './secondary-modal/secondary-modal.component';

@NgModule({
  declarations: [
    HeaderMenuComponent,
    MainCardComponent,
    BillCardComponent,
    ModalComponent,
    ModalNotificationComponent,
    LateralMenuComponent,
    EmptyContentComponent,
    FloatButtonComponent,
    ShoppingListComponent,
    SecondaryCardComponent,
    SecondaryModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderMenuComponent,
    MainCardComponent,
    BillCardComponent,
    ModalComponent,
    ModalNotificationComponent,
    LateralMenuComponent,
    EmptyContentComponent,
    FloatButtonComponent,
    ShoppingListComponent,
    SecondaryCardComponent,
    SecondaryModalComponent
  ]
})
export class SharedModule { }
