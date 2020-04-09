import { createReducer, on, Action } from '@ngrx/store';
import * as CadetActions from './cadet.actions';


export interface State {
  cadetData: any;
  cadetProgress: any;
  cadetDataSheet: any;
}


export const intialState = {
  cadetData: null,
  cadetProgress: null,
  cadetDataSheet: null
};

const cadetReducer = createReducer(
  intialState,
  on(CadetActions.setCadetData, (state, newData: any) => ({ ...state, cadetData: newData.data})),
  on(CadetActions.setCadetProgress, (state, cadetProgressData: any) => ({...state, cadetProgress: cadetProgressData.cadetProgress.progress})),
  on(CadetActions.loadCadetDataSheet, (state, cadetData: any) => ({...state, cadetDataSheet: cadetData.data}))
);

export function reducer(state: State | undefined, action: Action) {
  return cadetReducer(state, action);
}
