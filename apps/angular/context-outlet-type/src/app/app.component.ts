import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListContextDirective } from './directives/list-context.directive';
import { PersonContextDirective } from './directives/person-context.directive';
import { ListComponent } from './list.component';
import { PersonComponent } from './person.component';

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PersonComponent,
    ListComponent,
    PersonContextDirective,
    ListContextDirective,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template person let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template [context]="students" let-student let-i="index">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template [context]="cities" let-city let-i="index">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-template>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
