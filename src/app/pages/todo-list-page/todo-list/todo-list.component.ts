import { Component, inject, OnInit, signal } from '@angular/core';
import { Todo } from '../../../model/todo.model';
import { TodoComponent } from './todo/todo.component';
import { TodoListService } from '../../../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  imports: [TodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit{

  public todosService = inject(TodoListService)
  
  todos = this.todosService.todos


  ngOnInit(): void {
    
  this.todosService.fetchTodo()
  
  }

}
