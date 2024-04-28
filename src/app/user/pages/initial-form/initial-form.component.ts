import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from '../../services/user.service';
import { SessionsResponse } from '../models/session.model';
import { ITEM_NAME } from 'src/app/shared/services/storage.model';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.scss']
})
export class InitialFormComponent implements OnInit{

  form!: FormGroup;
  session!: string;
  sessionsResponse!: SessionsResponse;

  constructor(
    private storageService: StorageService, 
    private router: Router, 
    private userService: UserService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.storageService.setItem(ITEM_NAME.temporalOrders, JSON.stringify([]))
    this.route.params.subscribe(params => {      
      this.userService.$usuario.emit(false);
      this.storageService.setItem(ITEM_NAME.session, params['session']);
    });
      
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      user: new FormControl(this.getUserToForm(), [Validators.required, Validators.minLength(1)])
    });
  }

  saveUser() {
    this.storageService.setItem(ITEM_NAME.user, this.form.controls['user'].value);
    this.userService.$usuario.emit(true);
    this.router.navigate(['productos/lista-productos']);
  }

  getUserToForm(): string | null{
    return this.storageService.getItem(ITEM_NAME.user) ? this.storageService.getItem(ITEM_NAME.user) : '';
  }

}
