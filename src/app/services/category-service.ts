import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ToDoCategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private mockUrl = 'http://localhost:5187/Category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ToDoCategory[]> {
    return this.http.get<ToDoCategory[]>(this.mockUrl).pipe(
      map(categories => categories.map(c => new ToDoCategory(c.id, c.name)))
    );
  }
}
