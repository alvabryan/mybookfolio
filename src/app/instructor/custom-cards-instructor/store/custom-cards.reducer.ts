// import * as action from './custom-cards.actions';
import { createReducer, on, Action } from '@ngrx/store';
import * as customCardActions from './custom-cards.actions';
import { database } from 'firebase';

export interface State {
  assignments: {[key: string]: any};
  uploadingStatus: string;
  cadetSubmissions: Array<any>;
}

export const initialState = {
  assignments: null,
  uploadingStatus: 'not submitted',
  cadetSubmissions: null
};

const customCardsReducer = createReducer(
  initialState,
  on(customCardActions.createAssignment, (state) => ({...state, uploadingStatus: 'uploading'})),
  on(customCardActions.setAssignments, (state, data: any) => {
    const assignmentsData = {};

    data.assignments.forEach((assignData) => {
      assignmentsData[assignData.id] = assignData;
    });
    return {
      ...state,
      assignments: assignmentsData
    };
  }),
  on(customCardActions.uploadingStatus, (state) => ({...state, uploadingStatus: 'uploaded'})),
  on(customCardActions.resetUploadFileStatus, (state) => ({...state, uploadingStatus: 'not submitted'})),
  on(customCardActions.setCurrentAssignmentSubmissions, (state, data) => {
    const submissions = {};

    data.data.forEach((sub) => {
      submissions[sub.id] = sub;
    });

    return {
      ...state,
      cadetSubmissions: submissions
    };
  })
);

export function reducer(state: State | undefined, action: Action ) {
  return customCardsReducer(state, action);
}
