import { Component, inject, input, signal } from '@angular/core';
import { Todo } from '../../../../model/todo.model';
import { TodoListService } from '../../../../services/todo-list.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [RouterLink, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todo = input.required<Todo>();

  todoService = inject(TodoListService)
  completed = signal<boolean | undefined>( undefined)

  removeTodoItem(id: string | undefined) {
    if(id){
      this.todoService.removeTodoItem(id)
    }
  }

  updateTodoItemStatus(){
    this.todoService.updateTodoItemStatus(
      this.todo()?.id || '',
      this.todo().completed
    ).subscribe()
  }
}
