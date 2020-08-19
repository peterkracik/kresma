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
        // get user from the storage
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')) || null);
        this.currentUser = this.currentUserSubject.asObservable(); // as observable
    }

    /**
     * get data for current user
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * login
     * @param email
     * @param password
     */
    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/auth/`, { email, password })
            .pipe(
                map(response => {
                    // if successful
                    if (response.code === 200) {
                        localStorage.setItem('currentUser', JSON.stringify(response.data)); // store to the localstorage
                        this.currentUserSubject.next(response.data);    // assign it to the observable
                        return response.data;    // return user's data
                    }

                    // else remove from the storage
                    localStorage.removeItem('currentUser');
                    throw new Error('Incorrect credentials'); // return an error
                }
            ));
    }

    /**
     * logout
     */
    logout() {
        // remove user from local storage
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}