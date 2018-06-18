import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthCrea911Service } from './auth-crea911.service';

@Injectable()
export class AuthCreatifServiceService implements CanActivate {

  constructor(private router: Router, private authCrea911 : AuthCrea911Service) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.authCrea911.connected) {
      this.router.navigate['connexion']
      return false;
    }
    
    return true;
  }

}
