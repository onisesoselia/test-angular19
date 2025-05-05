import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListPageComponent } from "./pages/todo-list-page/todo-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoListPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-app';
}
