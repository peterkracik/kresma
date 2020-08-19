import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list.component';
import { ListResolverService } from './services/list-resolver.service';


const routes: Routes = [
    {
        path: '',
        component: ItemListComponent,
        resolve: { data: ListResolverService }
    },
    {
        path: ':page',
        component: ItemListComponent,
        resolve: { data: ListResolverService }
    },
    {
        path: ':page/:limit',
        component: ItemListComponent,
        resolve: { data: ListResolverService }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ItemListRouting {}
