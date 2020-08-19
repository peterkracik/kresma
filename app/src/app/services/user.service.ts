import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import User from '../models/user.interface';
@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor(private http: HttpClient) { }

    getUsr(email: string, password: string): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/auth`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(err: HttpErrorResponse | any) {
        console.error('An error occurred', err);
        return throwError(err.message || err);
    }
}
