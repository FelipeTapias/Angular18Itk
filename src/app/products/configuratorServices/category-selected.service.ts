import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../pages/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategorySelectedService {

  category$ = new Subject<Category>();

}
