import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list.component';
import { ItemListRouting } from './item-list-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ItemListComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ItemListRouting,
  ]
})
export class ItemListModule { }
