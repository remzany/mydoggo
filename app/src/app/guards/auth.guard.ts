import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {ProtectLoginService} from '../services/protect-login.service';


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private protectLogin: ProtectLoginService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.protectLogin.isPassphaseProvided()){
        this.protectLogin.setPassphase(false);
        return true;
      }
        
      else
        return false;
  }
  
}
