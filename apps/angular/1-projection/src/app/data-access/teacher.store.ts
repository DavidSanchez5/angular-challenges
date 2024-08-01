import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  #teachers = signal<Teacher[]>([]);

  get teachers() {
    return this.#teachers.asReadonly();
  }

  addAll(teachers: Teacher[]) {
    this.#teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.#teachers.set(this.teachers().concat(teacher));
  }

  deleteOne(id: number) {
    this.#teachers.set(this.teachers().filter((t) => t.id !== id));
  }
}
