import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInstructor implements CanActivate   {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree > {

    return this.auth.user.pipe(take(1) , map( user => {
      const isAuth = !!user;
      if (isAuth) {
        if ( user.userType === 'instructor' ) {
          return true;
        } else {
          this.router.navigate(['/home/login']);
          localStorage.clear();
        }
      } else {
        this.router.navigate(['/home/login']);
        localStorage.clear();
        return false;
      }

    }));

  }


}
