// import * as action from './custom-cards.actions';
import { createReducer, on, Action } from '@ngrx/store';
import * as customCardActions from './custom-cards.actions';
import { database } from 'firebase';

export interface State {
  assignments: {[key: string]: any};
}

export const initialState = {
  assignments: null
};

const customCardsReducer = createReducer(
  initialState,
  on(customCardActions.setAssignments, (state, data: any) => ({...state, assignments: data.assignments }))
);

export function reducer(state: State | undefined, action: Action ) {
  return customCardsReducer(state, action);
}
