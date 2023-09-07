import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState } from '../@store/counter/counter.reducers';
import {
  customCounter,
  decrement,
  increment,
  reset,
} from '../@store/counter/counter.actions';
import { getCounter } from '../@store/counter/counter.selectors';
import { AppState } from '../@store/app.state';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  // constructor(private store: Store<{ counter: CounterState }>) {}
  constructor(private store: Store<AppState>) {}

  counter$!: Observable<number>;
  val = 0;
  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }

  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }

  updateCounterValue() {
    this.store.dispatch(customCounter({ value: this.val }));
  }
}
