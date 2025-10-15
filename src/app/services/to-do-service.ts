import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ToDoCategory } from '../models/category';
import { ToDoItem } from '../models/to-do-Item';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  readonly url = 'http://localhost:5187/ToDoTask';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ToDoItem[]> {
    return this.http.get<any[]>(this.url + '/all').pipe(
      map(items => items.map(t => new ToDoItem(
        t.id,
        t.name, 
        t.category === null ? undefined : new ToDoCategory(t.category.id, t.category.name), 
        t.completed
      )))
    );
  }

  get(
    pageNumber = 1, 
    pageSize = 10, 
    includeNoCategory: boolean,
    search?: string, 
    categoryIds?: number[], 
  ): Observable<any> {

    let params = new HttpParams()
    .set('page', pageNumber)
    .set('pageSize', pageSize)
    .set('includeNoCategory', includeNoCategory);

    if (search) {
      params = params.set('search', search);
    }

    if (categoryIds && categoryIds.length > 0) {
      categoryIds.forEach(id => {
        params = params.append('categoryIds', id.toString());
      });
    }

    return this.http.get<any>(this.url, { params });
  }

  add(item: ToDoItem): Observable<any> {
    return this.http.post(this.url, {
      name: item.description,
      categoryId: item.category?.id
    });
  }

  update(item: ToDoItem): Observable<any> {
    return this.http.put(this.url, {
      id: item.id,
      name: item.description,
      completed: item.completed,
      categoryId: item.category === undefined ? null : item.category.id,
      category: null
    })
  }

  remove(item: ToDoItem): Observable<any> {
    return this.http.delete(`${this.url}/${item.id}`)
  }
}
