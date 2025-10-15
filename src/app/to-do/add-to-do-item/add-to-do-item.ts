import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoItem } from '../../models/to-do-Item';
import { compareCategories, ToDoCategory } from '../../models/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-to-do-item',
  imports: [FormsModule],
  templateUrl: './add-to-do-item.html',
  styleUrl: './add-to-do-item.css'
})
export class AddToDoItem {
  @Input() categories: ToDoCategory[] = [];
  @Output() itemAdded = new EventEmitter<ToDoItem>();

  newItem: ToDoItem = new ToDoItem(0, '');
  addItemText: string = '';
  selectedCategory: ToDoCategory | undefined;

  addToDoItem(): void {
    this.itemAdded.emit(this.newItem);
    this.newItem = new ToDoItem(0, '');
  }

  compareCategories = compareCategories;
}
