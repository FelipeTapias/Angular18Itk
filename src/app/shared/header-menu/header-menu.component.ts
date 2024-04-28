import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UserService } from 'src/app/user/services/user.service';
import { Category } from 'src/app/products/pages/models/product.interface';
import { ITEM_NAME } from '../services/storage.model';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  showMenu = false;
  showCategory: string | null = 'Recomendados'

  constructor(
    private storageService: StorageService, 
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.$usuario.subscribe(_ => this.showMenu = _);
    this.showCategory = this.storageService.getItem(ITEM_NAME.category) ? this.storageService.getItem(ITEM_NAME.category) : 'Recomendados'
    this.showMenu = this.storageService.getItem(ITEM_NAME.user) ? true : false;
  }

  getCategory(category: Category) {
    this.showCategory = category.code;
  }

}
