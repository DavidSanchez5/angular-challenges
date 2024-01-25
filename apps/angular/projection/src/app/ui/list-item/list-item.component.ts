import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-content></ng-content>
      <button (click)="delete(item.id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() item: any;
  @Input() name!: string;
  @Input() type!: CardType;
  @Output() DeleteNewRecordEmitter = new EventEmitter<number>();

  constructor() {}

  delete(id: number) {
    this.DeleteNewRecordEmitter.emit(id);
  }
}
