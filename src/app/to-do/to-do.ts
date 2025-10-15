import { Component, OnInit } from '@angular/core';
import { ToDoCategory } from '../models/category';
import { ToDoItem } from '../models/to-do-Item';
import { CategoryService } from '../services/category-service';
import { ToDoService } from '../services/to-do-service';
import { AddToDoItem } from "./add-to-do-item/add-to-do-item";
import { ListPagination } from "./list-pagination/list-pagination";
import { SearchToDoItem } from "./search-to-do-item/search-to-do-item";
import { ToDoItemList } from "./to-do-item-list/to-do-item-list";
import { NavBar } from "./nav-bar/nav-bar";

@Component({
  selector: 'app-to-do',
  imports: [ToDoItemList, AddToDoItem, SearchToDoItem, ListPagination, NavBar],
  templateUrl: './to-do.html',
  styleUrl: './to-do.css'
})
export class ToDo implements OnInit {
  constructor(
      private toDoService: ToDoService,
      private categoryService: CategoryService
    ) {}

  ngOnInit() {
    this.loadItems();
    this.loadCategories();
  }

  loadItems(): void {
    this.toDoService.get(
      this.currentPage, 
      this.pageSize,
      this.searchCategories.includes(undefined),
      this.searchText,
      this.searchCategories
        .filter(c => c !== undefined)
        .map(c => c.id)
    )
    .subscribe(data => {
      this.totalPages = data.maxPages;
      this.items = data.tasks
        .map((t: any) => new ToDoItem(
          t.id,
          t.name, 
          t.category === null ? undefined : new ToDoCategory(t.category.id, t.category.name), 
          t.completed
      ));
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  items: ToDoItem[] = [];
  categories: ToDoCategory[] = [];

  _pagedItems: ToDoItem[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  // Filtering
  searchText: string = '';
  searchCategories: (ToDoCategory | undefined)[] = [];

  get pagedItems(): ToDoItem[] {
    return this._pagedItems;
  }

  set pagedItems(value: any[]) {
    this._pagedItems.length = 0;
    this._pagedItems.push(...value);
  }

  onItemAdded(item: ToDoItem): void {
    this.toDoService.add(item).subscribe(() => this.loadItems());
  }

  onItemEdited(item: ToDoItem): void {
    this.toDoService.update(item).subscribe(() => this.loadItems());
  }

  onItemRemoved(item: ToDoItem): void {
    this.toDoService.remove(item).subscribe(() => this.loadItems());
  }
}
