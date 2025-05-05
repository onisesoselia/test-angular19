import { Component, inject } from '@angular/core';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RemoveTodoListComponent } from './remove-todo-list/remove-todo-list.component';
import { LoadingComponent } from "../../components/loading/loading.component";
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-list-page',
  imports: [AddTodoComponent, TodoListComponent, RemoveTodoListComponent, LoadingComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListPageComponent {

  todoService = inject(TodoListService)

  isLoading = this.todoService.isLoading

}
