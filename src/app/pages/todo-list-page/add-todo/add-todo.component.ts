import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoListService } from '../../../services/todo-list.service';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit{

  private todoService = inject(TodoListService)

  form!: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      todo: new FormControl("", [Validators.required, Validators.minLength(3)])
    })
  }

  addNewTodo(){
    const newTodoName = this.form.controls['todo'].value.trim()
    this.todoService.addNewTodo(newTodoName)
    this.form.reset()
    this.todoService.fetchTodo()
  }

}
