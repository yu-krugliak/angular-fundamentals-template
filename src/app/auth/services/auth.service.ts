import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';

export interface UserModel {
    name: string | undefined;
    email: string;
    password: string;
}

interface SuccessfulRequest<T> {
    data: T;
}
  
interface FailedRequest {
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
        private router: Router
    ) { }

    login(user: UserModel): Observable<SuccessfulRequest<string>> { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<SuccessfulRequest<string>>(this.getLoginUrl(), user)
            .pipe(tap(response => {
                this.sessionStorageService.setToken(response.data);
                this.isAuthorized$$.next(true);
                this.router.navigate(['/courses']);
            }
        )
    );}

    logout(): Observable<void> {
        // Add your code here
        return this.http.delete<void>(this.getLogOutUrl())
            .pipe(tap(() => {
                this.sessionStorageService.deleteToken();
                this.isAuthorized$$.next(false);
                this.router.navigate(['/login']);
            }
        )
    );}

    register(user: any) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<SuccessfulRequest<string>>(this.getRegisterUrl(), user)
            .pipe(tap(response => {
                this.sessionStorageService.setToken(response.data);
                this.isAuthorized$$.next(true);
                this.router.navigate(['/login']);
      }));
    }

    get isAuthorized() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.value;
    }

    set isAuthorized(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        // Add your code here
        return 'http://localhost:4000/login';
    }

    getRegisterUrl() {
        return 'http://localhost:4000/register';
    }

    getLogOutUrl() {
        return 'http://localhost:4000/logout';
    }
}
