import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for client works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDashboardComponent {}
