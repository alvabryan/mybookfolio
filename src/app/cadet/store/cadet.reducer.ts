import { createReducer, on, Action } from '@ngrx/store';
import * as cadetActions from './cadet.actions';


export interface State {
  test: string;
}


export const intialState = {
  test: null
};

const cadetReducer = createReducer(
  intialState,
  on(cadetActions.test, (state, cadetAction: any) => ({ ...state, test: cadetAction.name}))
);

export function reducer(state: State | undefined, action: Action) {
  return cadetReducer(state, action);
}
