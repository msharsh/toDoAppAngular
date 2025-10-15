import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoCategory } from '../../models/category';

@Component({
  selector: 'app-search-to-do-item',
  imports: [FormsModule],
  templateUrl: './search-to-do-item.html',
  styleUrl: './search-to-do-item.css'
})
export class SearchToDoItem implements OnChanges {
  @Input() categories: ToDoCategory[] = [];
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchCategoryChange = new EventEmitter<(ToDoCategory | undefined)[]>();

  searchText: string = '';

  categoryFilters: boolean[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories']) {
      this.categoryFilters = new Array(this.categories.length + 1).fill(true);
      this.categoryFilterSet();
    }
  }

  onSearchTextChange(): void {
    this.searchTextChange.emit(this.searchText);
  }

  categoryFilterSet(): void {
    let includedCategories: (ToDoCategory | undefined)[] = [];
    if (this.categoryFilters[0]) {
      includedCategories.push(undefined);
    }

    for (let index = 1; index < this.categoryFilters.length; index++) {
      if (this.categoryFilters[index]) {
        includedCategories.push(this.categories[index-1])
      }
    }
    this.searchCategoryChange.emit(includedCategories);
  }
}
