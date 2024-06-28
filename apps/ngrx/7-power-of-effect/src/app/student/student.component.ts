/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { StudentStore } from './student.store';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  providers: [provideComponentStore(StudentStore)],
  selector: 'student',
  template: `
    <h3>STUDENTS</h3>
    @for (student of students$ | async; track $index) {
      <div>
        {{ student.firstname }} {{ student.lastname }} - {{ student.version }}
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
        border: 1px solid red;
        padding: 4px;
      }
    `,
  ],
})
export class StudentComponent {
  #store = inject(StudentStore);
  students$ = this.#store.students$;
}
