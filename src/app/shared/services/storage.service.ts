import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(name: string, data: any) {
    localStorage.setItem(name, data);
  }

  getItem(name: string): string  {
    return localStorage.getItem(name)!;
  }

  userIsLogged(name: string): boolean {
    return this.getItem(name) ? true : false;
  }
}
