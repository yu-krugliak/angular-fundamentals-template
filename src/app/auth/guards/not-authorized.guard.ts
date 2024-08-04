import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
    // Add your code here
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
        return this.authService.isAuthorized$
            .pipe(
              map(isAuthorized => {
                if (!isAuthorized) {
                  return true;
                } else {
                  return this.router.createUrlTree(['/courses']);
                }
            })
        )
    }
}
