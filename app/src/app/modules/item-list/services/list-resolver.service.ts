import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListService } from './list.service';

@Injectable({
    providedIn: 'root'
})
export class ListResolverService implements Resolve<any> {
    constructor(private listService: ListService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const page = parseInt(route.paramMap.get('page')) || 1;
        const limit = parseInt(route.paramMap.get('limit')) || 5;
        return this.listService.getList(page, limit);
    }
}