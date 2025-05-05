import { Component, inject, input } from '@angular/core';
import { Todo } from '../../../../model/todo.model';
import { TodoListService } from '../../../../services/todo-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo',
  imports: [RouterLink],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todo = input.required<Todo>();

  todoService = inject(TodoListService)

  removeTodoItem(id: string | undefined) {
    if(id){
      this.todoService.removeTodoItem(id)
    }
  }
}
