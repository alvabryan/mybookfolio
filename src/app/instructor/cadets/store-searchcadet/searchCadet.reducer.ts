import { createReducer, on, Action } from '@ngrx/store';
import * as searchCadetActions from './searchCadet.actions';

export interface State {
  cadetSearchData: any;
}

export const initialState = {
  cadetSearchData: null
};

const searchCadetReducer = createReducer(
  initialState,
  on(searchCadetActions.setSearchCadet, (state, searchCadetData: any) => ({...state, cadetSearchData: searchCadetData}))
);


export function reducer(state: State | undefined, action: Action) {
  return searchCadetReducer(state, action);
}
