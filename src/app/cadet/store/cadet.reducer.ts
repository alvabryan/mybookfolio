import { createReducer, on, Action } from '@ngrx/store';
import * as CadetActions from './cadet.actions';


export interface State {
  cadetData: any;
  cadetProgress: any;
}


export const intialState = {
  cadetData: null,
  cadetProgress: null
};

const cadetReducer = createReducer(
  intialState,
  on(CadetActions.setCadetData, (state, newData: any) => ({ ...state, cadetData: newData.data})),
  on(CadetActions.setCadetProgress, (state, cadetProgressData: any) => ({...state, cadetProgress: cadetProgressData.cadetProgress.progress}))
);

export function reducer(state: State | undefined, action: Action) {
  return cadetReducer(state, action);
}
