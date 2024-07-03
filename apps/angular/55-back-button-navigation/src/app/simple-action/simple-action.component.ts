import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent {
  readonly #dialog = inject(MatDialog);

  canDeactivate(): boolean {
    return false;
  }

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
    });
  }
}
