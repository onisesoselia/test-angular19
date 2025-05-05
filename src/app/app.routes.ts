import { Routes } from '@angular/router';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list.component';
import { TodoDetailsComponent } from './pages/todo-details/todo-details.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todos',
    component: TodoListPageComponent,
  },
  {
    path: 'todos/:id',
    component: TodoDetailsComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
