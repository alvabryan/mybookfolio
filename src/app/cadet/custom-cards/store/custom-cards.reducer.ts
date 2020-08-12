// import * as action from './custom-cards.actions';
import { createReducer, on, Action } from '@ngrx/store';

import * as customCardActions from './custom-cards.actions';

export interface State {
  assignments: {[key: string]: any};
}

export const initialState = {
  assignments: null
};

const customCardsReducer = createReducer(
  initialState,
  on(customCardActions.setAssignments, (state, data) => {
    const assignmentData = {};

    data.assignments.forEach((assignData) => {
      assignmentData[assignData.id] = assignData;
    });

    return {
      ...state,
      assignments: assignmentData
    };
  })
);

export function reducer(state: State | undefined, action: Action ) {
  return customCardsReducer(state, action);
}
