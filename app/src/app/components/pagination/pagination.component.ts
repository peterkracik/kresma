import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

interface Page {
  index: number;
  isActive: boolean;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageCount: number;
  @Input() current: number;
  @Output() changePage = new EventEmitter<number>();

  pages: Page[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setPage(changes.pageCount?.currentValue || this.pageCount, changes.current?.currentValue || this.current);
  }

  setPage(pageCount: number, current: number = 1) {
    this.pages = [...Array(pageCount).keys()].map(nr => {
      return {
        index: ++nr,
        isActive: nr === current
      };
    });
  }

  change(pageNr: number) {
    this.changePage.emit(pageNr);
  }
}
