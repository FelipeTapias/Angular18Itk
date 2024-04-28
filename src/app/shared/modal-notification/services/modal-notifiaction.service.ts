import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalNotifiactionService {

  $modalNotifiactions = new EventEmitter<boolean>();
  
}
