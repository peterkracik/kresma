import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import User from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')) || null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/auth/`, { email, password })
            .pipe(
                map(response => {
                    if (response.code === 200) {
                        localStorage.setItem('currentUser', JSON.stringify(response.data));
                        this.currentUserSubject.next(response.data);
                        return response.data;
                    }
                    localStorage.removeItem('currentUser');
                    throw new Error('Incorrect credentials');
                }
            ));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}