import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalNotifiactionService } from './services/modal-notifiaction.service';
import { NotificationConfig } from './models/modal-notification.model';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.scss']
})
export class ModalNotificationComponent {
  @Input() config!: NotificationConfig;
  @Output() orderProduct = new EventEmitter();

  constructor(private notificationService: ModalNotifiactionService){}


  orderProductConfirm() {
    this.orderProduct.emit();
  }

  closeNotification() {
    this.notificationService.$modalNotifiactions.emit(false);
  }
}
