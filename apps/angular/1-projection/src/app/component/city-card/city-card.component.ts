import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CityStore } from './../../data-access/city.store';
@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  styleUrl: './city-card.component.css',
})
export class CityCardComponent implements OnInit {
  cities$ = this.store.cities$;
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((r) => this.store.addAll(r));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
