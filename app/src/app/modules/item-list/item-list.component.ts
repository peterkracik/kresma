import { Component, OnInit } from '@angular/core';
import Item from 'src/app/models/item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Pagination from 'src/app/models/pagination.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(response => {
      this.items = response.data.items;
      this.pagination = response.data.pagination;
    });
  }

  onChangePage(pageNr: number) {
    this.router.navigate(['', pageNr]);
  }

}
