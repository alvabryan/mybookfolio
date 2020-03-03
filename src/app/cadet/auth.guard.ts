import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate   {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData.userType === 'cadet') {
      return true;
    }

    if (userData.userType === 'instructor') {
      this.router.navigate(['/instructor']);
      return false;
    }

    this.router.navigate(['/']);

    return false;
  }


}
