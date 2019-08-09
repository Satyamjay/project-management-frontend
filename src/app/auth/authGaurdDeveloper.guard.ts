import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot,
         RouterStateSnapshot, UrlTree, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardDeveloper implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isDeveloper())
      return true;
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canLoad(route: Route): boolean{
    if(this.authService.isDeveloper())
      return true;
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
