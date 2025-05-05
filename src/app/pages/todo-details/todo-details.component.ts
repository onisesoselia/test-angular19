import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoListService } from '../../services/todo-list.service';
import { Todo } from '../../model/todo.model';
import { NgClass, NgStyle } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  imports: [NgStyle, LoadingComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit {
  router = inject(ActivatedRoute);
  todoService = inject(TodoListService);

  form!: FormGroup

  todo = signal<Todo | undefined>(undefined);

  isLoading = this.todoService.isLoading;

  showEditForm = signal<boolean>(false)

  ngOnInit(): void {
    this.router.paramMap.subscribe((actRout) => {
      const todoId = actRout.get('id');

      if (todoId) {
        this.todoService.isLoading.set(true);
        this.todoService.getTodoItem(todoId || '').subscribe({
          next: (data) => {
            this.todo.set(data);
            this.initForm(data)
            this.todoService.isLoading.set(false);
          },
        });
      }
    });
  }

  initForm(todo : Todo){
    this.form = new FormGroup({
      name: new FormControl(todo.name, [Validators.minLength(3)]),
      completed: new FormControl(todo.completed)
    })
  } 

  get checked() : boolean{
    return this.todo()?.name === this.form.value.name && this.todo()?.completed === this.form.value.completed
  }

  submitChangeInfo(){
    this.todoService.isLoading.set(true);
    if(this.form.valid){
      const todoValue: Todo = this.form.value 
      this.todoService.updateTodoItem(this.todo()?.id || "", todoValue).subscribe({
        next: (data)=>{
          
          this.todoService.getTodoItem(this.todo()?.id || "").subscribe({
            next: (data)=>{
              this.todo.set(data)
              this.todoService.isLoading.set(false);
            }
          })
        }
      })
    }
  }
}
