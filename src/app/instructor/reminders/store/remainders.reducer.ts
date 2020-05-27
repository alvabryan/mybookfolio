import { createReducer, on, Action } from '@ngrx/store';
import * as remindersActions from './remainders.actions';

export interface State {
  reminderData: {[key: string]: any};
}

export const initialState = {
  reminderData: null
};

const remaindersReducer = createReducer(
  initialState,
  on(remindersActions.setReminders, (state, data: any) => {
    const toSort = data.reminders;
    toSort.sort((a, b) => (a.dateSent > b.dateSent) ? -1 : 1);

    return {
      ...state,
      reminderData: toSort
    };
  })
);


export function reducer(state: State | undefined, action: Action) {
  return remaindersReducer(state, action);
}
