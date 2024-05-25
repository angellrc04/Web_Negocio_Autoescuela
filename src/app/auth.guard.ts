import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        // Redirigir a la página de inicio de sesión con un estado adicional
        return router.createUrlTree(['/PaginaInicioComponent'], {
          queryParams: { authRedirect: true }
        });
      }
    })
  );
};
