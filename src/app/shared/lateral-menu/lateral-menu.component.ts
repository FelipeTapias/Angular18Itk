import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategorySelectedService } from 'src/app/products/configuratorServices/category-selected.service';
import { ConfiguratorService } from 'src/app/products/configuratorServices/configurator.service';
import { Category } from 'src/app/products/pages/models/product.interface';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent {

  @ViewChild('myCheck', { static: false }) myCheck!: ElementRef;
  @Output() category = new EventEmitter<Category>();
  categories!: Category[];

  constructor(
    private configuratorService: ConfiguratorService,
    private categorySelectedService: CategorySelectedService) { 
    this.getCategories();
  }

  selectedItem(category: Category){
    this.category.emit(category);
    this.categorySelectedService.category$.next(category);
    this.myCheck.nativeElement.checked = false;
  }

  getCategories()  {
    this.configuratorService.getCategories().subscribe(data => {
      this.categories = data.sort((a, b) => a.order - b.order)
      this.myCheck.nativeElement.checked = true;
    }); 
  }

  closeMenu() {
    this.myCheck.nativeElement.checked = false;
  }

}
