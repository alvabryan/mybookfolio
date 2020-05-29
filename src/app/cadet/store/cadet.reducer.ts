import { createReducer, on, Action } from '@ngrx/store';
import * as CadetActions from './cadet.actions';


export interface State {
  cadetData: any;
  cadetProgress: any;
  cadetDataSheet: any;
  reminderData: {[key: string]: any};
}


export const intialState = {
  cadetData: null,
  cadetProgress: null,
  cadetDataSheet: null,
  reminderData: null,
};

const cadetReducer = createReducer(
  intialState,
  on(CadetActions.setCadetData, (state, newData: any) => ({ ...state, cadetData: newData.data})),
  on(CadetActions.setCadetProgress, (state, cadetProgressData: any) => ({...state, cadetProgress: cadetProgressData.cadetProgress.progress})),
  on(CadetActions.loadCadetDataSheet, (state, cadetData: any) => ({...state, cadetDataSheet: cadetData.data})),
  on(CadetActions.setReminders, (state, data: any) => {
    const toSort = data.reminders;
    toSort.sort((a, b) => (a.dateSent > b.dateSent) ? -1 : 1);

    return {
      ...state,
      reminderData: toSort
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return cadetReducer(state, action);
}
