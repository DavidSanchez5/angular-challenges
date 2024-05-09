import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { debounceTime, distinctUntilChanged, skipWhile, tap } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoStore } from './photos.store';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    RouterLinkWithHref,
  ],
  template: `
    <h2 class="mb-2 text-xl">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="search"
        placeholder="find a photo" />
    </mat-form-field>

    @if (vm$ | async; as vm) {
      <section class="flex flex-col">
        <section class="flex items-center gap-3">
          <button
            [disabled]="vm.page === 1"
            [class.bg-gray-400]="vm.page === 1"
            class="rounded-md border p-3 text-xl"
            (click)="store.previousPage()">
            <
          </button>
          <button
            [disabled]="vm.endOfPage"
            [class.bg-gray-400]="vm.endOfPage"
            class="rounded-md border p-3 text-xl"
            (click)="store.nextPage()">
            >
          </button>
          Page :{{ vm.page }} / {{ vm.pages }}
        </section>
        @if (vm.loading) {
          <mat-progress-bar mode="query" class="mt-5" />
        }
        @if (vm.photos && vm.photos.length > 0) {
          <ul class="flex flex-wrap gap-4">
            @for (photo of vm.photos; track photo.id) {
              <li>
                <a routerLink="detail" [queryParams]="{ photo: encode(photo) }">
                  <img
                    src="{{ photo.url_q }}"
                    alt="{{ photo.title }}"
                    class="image" />
                </a>
              </li>
            }
          </ul>
        } @else {
          <div>No Photos found. Type a search word.</div>
        }
        <footer class="text-red-500">
          {{ vm.error }}
        </footer>
      </section>
    }
  `,
  providers: [provideComponentStore(PhotoStore)],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent implements OnInit {
  store = inject(PhotoStore);
  readonly vm$ = this.store.vm$.pipe(
    tap(({ search }) => {
      if (!this.formInit) {
        this.search.setValue(search);
        this.formInit = true;
      }
    }),
  );

  private formInit = false;
  search = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.store.search(
      this.search.valueChanges.pipe(
        skipWhile(() => !this.formInit),
        debounceTime(300),
        distinctUntilChanged(),
      ),
    );
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
