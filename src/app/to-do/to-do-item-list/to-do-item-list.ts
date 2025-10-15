import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoItem } from '../../models/to-do-Item';
import { compareCategories, ToDoCategory } from '../../models/category';

@Component({
  selector: 'app-to-do-item-list',
  imports: [FormsModule],
  templateUrl: './to-do-item-list.html',
  styleUrl: './to-do-item-list.css'
})
export class ToDoItemList {
  @Input() items: ToDoItem[] = [];
  @Input() categories: ToDoCategory[] = [];

  @Output() itemEdited = new EventEmitter<ToDoItem>()
  @Output() itemRemoved = new EventEmitter<ToDoItem>()
  
  compareCategories = compareCategories;

  editIndex: number = -1;
  tmpEditItem: ToDoItem = new ToDoItem(0, '');

  itemCompletedChanged(item: ToDoItem): void {
    this.itemEdited.emit(item);
  }

  editToDoItem(item: ToDoItem): void {
    this.editIndex = item.id;
    this.tmpEditItem = { ...item, category: item.category ?? undefined };
  }

  confirmEditToDoItem(item: ToDoItem): void {
    this.itemEdited.emit(new ToDoItem(
      item.id,
      this.tmpEditItem.description,
      this.tmpEditItem.category,
      item.completed
    ));

    this.editIndex = -1;
  }

  cancelEditToDoItem(): void {
    this.editIndex = -1;
  }

  removeToDoItem(item: ToDoItem): void {
    this.itemRemoved.emit(item);
  }
}
