import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    // Add your code here
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(_route: Route, _segments: UrlSegment[]): Observable<boolean | UrlTree> {
        return this.authService.isAuthorized$
            .pipe(
              map(isAuthorized => {
                if (isAuthorized) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/login'])
                }
            })
        )
    }
}
