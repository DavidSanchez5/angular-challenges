import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, ScrollingModule],
  selector: 'app-home',
  styles: [
    `
      #bottom,
      #top {
        scroll-behavior: smooth;
      }
    `,
  ],
  template: `
    <nav-button href="/foo" class="fixed top-3 left-1/2">Foo Page</nav-button>
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button href="" fragment="bottom">Scroll Bottom</nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button href="" fragment="top">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {}
