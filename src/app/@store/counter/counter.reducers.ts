import { createReducer, on } from '@ngrx/store';
import { customCounter, decrement, increment, reset } from './counter.actions';

export interface CounterState {
  counter: number;
}
const initialState: CounterState = {
  counter: 0,
};
const reducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customCounter, (state, action) => {
    return {
      ...state,
      counter: action.value,
    };
  })
);

export function counterReducer(state: any, action: any) {
  return reducer(state, action);
}
