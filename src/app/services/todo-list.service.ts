import { inject, Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor() {}

  httpClient = inject(HttpClient);

  private _todos = signal<Todo[]>([]);

  isLoading = signal<boolean>(false);

  readonly todos = this._todos.asReadonly();

  addNewTodo(name: string) {
    this.isLoading.set(true);
    const newTodo = new Todo(name);
    this.httpClient
      .post<{ [key: string]: string }>(
        'https://angulartodoproject-default-rtdb.firebaseio.com/todos.json',
        newTodo
      )
      .subscribe({
        next: (res) => {
          this.fetchTodo();
          this.isLoading.set(false);
        },
      });
  }

  fetchTodo() {
    this.isLoading.set(true);
    this.httpClient
      .get<{ [key: string]: Todo }>(
        'https://angulartodoproject-default-rtdb.firebaseio.com/todos.json'
      )
      .pipe(
        map((data) => {
          const new_array: Todo[] = [];
          for (let item in data) {
            new_array.push({ ...data[item], id: item });
            this._todos.set(new_array);
          }
        })
      )
      .subscribe({
        next: () => {
          this.isLoading.set(false);
        },
      });
  }

  getTodoItem(id: string): Observable<Todo> {
    // this.isLoading.set(true);
    return this.httpClient
      .get<Todo>(
        'https://angulartodoproject-default-rtdb.firebaseio.com/todos/' +
          id +
          '.json'
      )
      .pipe(
        map((data) => {
          return { ...data, id } as Todo;
        })
      );
  }

  removeTodoList() {
    this.isLoading.set(true);
    this.httpClient
      .delete(
        'https://angulartodoproject-default-rtdb.firebaseio.com/todos.json'
      )
      .subscribe({
        next: (res) => {
          this.fetchTodo();
          this.isLoading.set(false);
        },
      });
  }

  removeTodoItem(id: string) {
    this.isLoading.set(true);
    this.httpClient
      .delete(
        'https://angulartodoproject-default-rtdb.firebaseio.com/todos/' +
          id +
          '.json'
      )
      .subscribe({
        next: (res) => {
          this.fetchTodo();
          this.isLoading.set(false);
        },
      });
  }

  updateTodoItem(id: string, todo: Todo) {
    return this.httpClient.put(
      'https://angulartodoproject-default-rtdb.firebaseio.com/todos/' +
        id +
        '.json',
      todo
    );
  }

  updateTodoItemStatus(id: string, completed: boolean) {
    return this.httpClient.patch(
      'https://angulartodoproject-default-rtdb.firebaseio.com/todos/' +
        id +
        '.json',
      { completed }
    );
  }
}
