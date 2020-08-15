// import * as action from './custom-cards.actions';
import { createReducer, on, Action } from '@ngrx/store';

import * as customCardActions from './custom-cards.actions';

export interface State {
  assignments: {[key: string]: any};
  loadingStatus: string;
  currentAssignmentSubmission: any;
}

export const initialState = {
  assignments: null,
  loadingStatus: 'not submitted',
  currentAssignmentSubmission: null
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
  }),
  on(customCardActions.setLoadingStatus, (state) => ({...state, loadingStatus: 'uploaded'})),
  on(customCardActions.resetUploadFileStatus, (state) => ({...state, loadingStatus: 'not submitted'})),
  on(customCardActions.setCadetSubmission, (state, data) => {
    const submission = data.submission ? data.submission : null;
    return {
      ...state,
      currentAssignmentSubmission: submission
    };
  })
);

export function reducer(state: State | undefined, action: Action ) {
  return customCardsReducer(state, action);
}
