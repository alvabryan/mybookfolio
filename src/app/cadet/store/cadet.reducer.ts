import { createReducer, on, Action } from '@ngrx/store';
import * as CadetActions from './cadet.actions';


export interface State {
  cadetData: any;
}


export const intialState = {
  cadetData: null
};

const cadetReducer = createReducer(
  intialState,
  on(CadetActions.setCadetData, (state, newData: any) => ({ ...state, cadetData: newData.data}))
);

export function reducer(state: State | undefined, action: Action) {
  return cadetReducer(state, action);
}
