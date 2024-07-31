/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'nav-button',
  standalone: true,
  imports: [RouterLinkWithHref],
  template: `
    <a [routerLink]="href()" [fragment]="section()">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  section = input<string>('');
  href = input<string>('');
}
