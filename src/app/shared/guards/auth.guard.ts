import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

// guard for checking if user logged in , if not navigate user to login page
export const authGuard: CanActivateFn = (route, state) => {
  // const επειδη δεν ειμαστε μεσα σε class αλλα function
  const userService = inject(UserService);
  const router = inject(Router);
  
  if(userService.user$() && !userService.isTokenExpired()) {
    return true;
  }

  return router.navigate(["login"]);
};
