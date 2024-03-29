import * as fromRoot from '../../store/index';
import * as fromCadetReducer from './cadet.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducer';

import * as customCardsReducer from '../custom-cards/store/custom-cards.reducer';

export interface CadetState {
  cadet: any;
  customCards: any;
}

export interface State extends fromRoot.State {
  cadet: CadetState;
  customCards: customCardsReducer.State;
}

export const reducers = {
  cadet: fromCadetReducer.reducer,
  customCards: customCardsReducer.reducer
};


// instructor reducer selector
export const cadetSelector = createFeatureSelector<CadetState>('cadet');

// auth reducer selectors
export const authSelector = createFeatureSelector<fromAuth.State>('auth');

export const authUserSelector = createSelector(
  authSelector,
  (state: fromAuth.State) => state.user
);
