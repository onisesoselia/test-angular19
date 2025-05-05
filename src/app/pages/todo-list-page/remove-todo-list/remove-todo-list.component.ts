import { Component, inject } from '@angular/core';
import { TodoListService } from '../../../services/todo-list.service';

@Component({
  selector: 'app-remove-todo-list',
  imports: [],
  templateUrl: './remove-todo-list.component.html',
  styleUrl: './remove-todo-list.component.scss'
})
export class RemoveTodoListComponent {

  todoService = inject(TodoListService)

  removeTodoList(){
    this.todoService.removeTodoList()
  }

}
