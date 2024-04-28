import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ITEM_NAME } from 'src/app/shared/services/storage.model';
import { StorageService } from 'src/app/shared/services/storage.service';

export const authGuardGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if(!storageService.userIsLogged(ITEM_NAME.user)) {
    router.navigate(['usuario/ingresar-usuario']);
  }

  return true;
};
