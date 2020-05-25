import { createReducer, on, Action } from '@ngrx/store';
import * as remindersActions from './remainders.actions';

export interface State {
  cadetProgress: string;
  cadetDataSheet: {[key: string]: any};
}

export const initialState = {

};

const remaindersReducer = createReducer(
  initialState
);


export function reducer(state: State | undefined, action: Action) {
  return remaindersReducer(state, action);
}
