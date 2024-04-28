import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

export const userGuardGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if(storageService.userIsLogged('user')) {
    router.navigate(['productos/lista-productos']);
  }
  return true;
};
