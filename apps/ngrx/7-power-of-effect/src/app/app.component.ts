import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  template: `
    <nav>
      <button routerLink="/teacher">Teacher</button>
      <button routerLink="/student">Student</button>
      <button routerLink="/school">School</button>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 20px;

        nav {
          display: flex;
          gap: 20px;
        }
      }
    `,
  ],
})
export class AppComponent {}
