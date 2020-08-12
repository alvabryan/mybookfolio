// import * as action from './custom-cards.actions';
import { createReducer, on, Action } from '@ngrx/store';
import * as customCardActions from './custom-cards.actions';
import { database } from 'firebase';

export interface State {
  assignments: {[key: string]: any};
  uploadingStatus: string;
}

export const initialState = {
  assignments: null,
  uploadingStatus: 'not submitted'
};

const customCardsReducer = createReducer(
  initialState,
  on(customCardActions.createAssignment, (state) => ({...state, uploadingStatus: 'uploading'})),
  on(customCardActions.setAssignments, (state, data: any) => ({...state, assignments: data.assignments })),
  on(customCardActions.uploadingStatus, (state) => ({...state, uploadingStatus: 'uploaded'})),
  on(customCardActions.resetUploadFileStatus, (state) => ({...state, uploadingStatus: 'not submitted'}))
);

export function reducer(state: State | undefined, action: Action ) {
  return customCardsReducer(state, action);
}
