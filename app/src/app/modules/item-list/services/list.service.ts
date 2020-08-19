import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import Item from '../../../models/item.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  /**
   * get list of items
   * @param page     page index (starting from 1)
   * @param limit   limit items per page
   */
  getList(page: number = 1, limit: number = 5): Observable<any> {
    let params = new HttpParams();
    // Begin assigning parameters
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http.get<any>(`${environment.apiUrl}/list/`, { params })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response.data)
      );
  }

  /**
   * handling errors
   * @param err errors
   */
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
