import * as fromRoot from '../../store/index';
import * as fromCadetReducer from './cadet.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducer';

export interface CadetState {
  cadet: any;
}

export interface State extends fromRoot.State {
  cadet: CadetState;
}

export const reducers = fromCadetReducer.reducer;


// instructor reducer selector
export const cadetSelector = createFeatureSelector<CadetState>('instructor');

// auth reducer selectors
export const authSelector = createFeatureSelector<fromAuth.State>('auth');

export const authUserSelector = createSelector(
  authSelector,
  (state: fromAuth.State) => state.user
);
