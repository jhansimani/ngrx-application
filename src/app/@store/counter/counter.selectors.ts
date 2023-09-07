import { createFeatureSelector, createSelector } from '@ngrx/store';

const counter = createFeatureSelector('counter');

export const getCounter = createSelector(counter, (data: any) => {
  return data.counter;
});
