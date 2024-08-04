import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$ = this.name$$.asObservable();
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) {}
    
    getUser(): Observable<any> {
        // Add your code here
        return this.userService.getUser().pipe(
          tap(res => {
            const user = res.result;
            this.name$$.next(user.name);
            this.isAdmin$$.next(user.role === "admin");
          })
        );
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }

    get name() {
        return this.name$$.getValue();
   }
}
