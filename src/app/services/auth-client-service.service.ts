import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from './crea911.const';

@Injectable()
export class AuthClientServiceService implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token==null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
