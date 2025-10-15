import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-pagination',
  imports: [],
  templateUrl: './list-pagination.html',
  styleUrl: './list-pagination.css'
})
export class ListPagination implements OnChanges {
  @Input() totalPages: number = 1;
  @Output() currentPageChange = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.onCurrentPageChange();
      }
    }
  }

  currentPage = 1;

  onCurrentPageChange(): void {
    this.currentPageChange.emit(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onCurrentPageChange();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onCurrentPageChange();
    }
  }
}
