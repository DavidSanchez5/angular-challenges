/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

// export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,

  // FIRST SOLUTION AND SECOND SOLUTION it can be removed styles array from here
  styles: [
    `
      :host-context(.error) {
        --text-font-size: 30px;
        --text-color: red;
      }
      :host-context(.warning) {
        --text-font-size: 25px;
        --text-color: orange;
      }
    `,
  ],
})
export class TextStaticComponent {}
