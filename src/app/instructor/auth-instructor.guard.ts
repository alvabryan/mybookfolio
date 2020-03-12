import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInstructor implements CanActivate   {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      if (userData.userType === 'instructor') {
        return true;
      }

      if (userData.userType === 'cadet') {
        this.router.navigate(['/cadet']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }

    this.router.navigate(['/']);

    return false;
  }


}
