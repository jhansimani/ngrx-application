import { createFeatureSelector, createSelector } from '@ngrx/store';

const getRouterState = createFeatureSelector('router');

export const getCurrentRoute = createSelector(getRouterState, (router: any) => {
  return router.state;
});
