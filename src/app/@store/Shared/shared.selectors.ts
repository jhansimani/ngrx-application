import { createFeatureSelector, createSelector } from '@ngrx/store';

export const SHARED_STATE_NAME = 'shared';
const getSharedState = createFeatureSelector(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state: any) => {
  return state.showLoading;
});

export const getErrorMessage = createSelector(getSharedState, (state: any) => {
  return state.errorMessage;
});
