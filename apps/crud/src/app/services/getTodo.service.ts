import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoConfig } from '../core/Interface/todo';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ToDoStore } from '../store/todo.store';
@Injectable({
  providedIn: 'root',
})
export class GetToDoService {
  private commonUrl = 'https://jsonplaceholder.typicode.com/todos';
  public data$: Observable<TodoConfig[]>;
  public globalLoader$: Observable<boolean> =
    this.toDoStore.getGlobalLoaderFlag$;
  public localLoader$: Observable<boolean> =
    this.toDoStore.getLocalSpinnerFlag$;
  public errorValue = '';

  private headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  constructor(private http: HttpClient, private toDoStore: ToDoStore) {
    this.data$ = this.toDoStore.select((state) => state.todos);
  }
  getTodoData() {
    this.toDoStore.setGlobalLoaderFlag(true);
    this.http.get<TodoConfig[]>(this.commonUrl).subscribe({
      next: (data: TodoConfig[]) => {
        this.toDoStore.loadToDos(data);
        this.toDoStore.setGlobalLoaderFlag(false);
      },
      error: (err) => {
        this.toDoStore.setError('error occurred in operation');
      },
      complete: () => {
        this.toDoStore.setComplete('operation completed');
      },
    });
  }
  updateTodo(todo: TodoConfig) {
    this.toDoStore.setLocalSpinnerFlag(true);
    this.http
      .put<TodoConfig>(
        `${this.commonUrl}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: this.headers,
        }
      )
      .subscribe({
        next: (todoUpdated) => {
          this.toDoStore.updateTodoState(todoUpdated);
          this.toDoStore.setLocalSpinnerFlag(false);
        },
        error: (err) => {
          this.toDoStore.setError('error occurred in operation');
        },
        complete: () => {
          this.toDoStore.setComplete('operation completed');
        },
      });
  }
  deleteTodo(id: number) {
    this.toDoStore.setLocalSpinnerFlag(true);
    this.http.delete(`${this.commonUrl}/${id}`).subscribe({
      next: () => {
        this.toDoStore.deleteOneTodoState(id);
        this.toDoStore.setLocalSpinnerFlag(false);
      },
      error: (e) => {
        this.toDoStore.setError('error occurred in operation');
      },
      complete: () => {
        this.toDoStore.setComplete('operation completed');
      },
    });
  }
}
