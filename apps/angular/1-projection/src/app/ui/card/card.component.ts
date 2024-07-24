import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-container [ngTemplateOutlet]="imgTemplate"></ng-container>      

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName"
          [id]="item.id"
          [type]="type"></app-list-item>
      </section>

      <ng-container [ngTemplateOutlet]="actionTemplate"></ng-container>
      
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() imgTemplate! : TemplateRef<any>;
  @Input() actionTemplate! : TemplateRef<any>;

  CardType = CardType;
}
