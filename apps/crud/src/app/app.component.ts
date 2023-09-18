import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from './models/interface.todo';
import { TodosService } from './services/todos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentStore } from '@ngrx/component-store';
import { TodosStore } from './store/todos.store';
import { ItemComponent } from './components/item.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ItemComponent],
  selector: 'app-root',
  template: `
    <div *ngIf="todos$ | async; else loading">
      <div *ngFor="let todo of todos$ | async">
        <app-item
          [todo]="todo"
          [processingItemId]="processingItemId$ | async"></app-item>
      </div>
    </div>
    <ng-template #loading>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
  styles: [],
  providers: [ComponentStore, TodosStore],
})
export class AppComponent implements OnInit {
  todos$ = this.todosStore.todos$;
  processingItemId$ = this.todosStore.processingItemId$; // Get processingItemId from TodosStore

  constructor(
    public todosService: TodosService,
    private readonly todosStore: TodosStore
  ) {}

  ngOnInit(): void {
    this.todosService.initTodos().subscribe({
      next: (todos: Todo[] | null) => {
        this.todosStore.loadTodos(todos);
      },
    });
  }
}
