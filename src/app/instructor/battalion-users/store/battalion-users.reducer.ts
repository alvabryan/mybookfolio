import * as battalionUserAction from './battalion-users.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  linkedInstructors: any;
  battalionCode: any;
}

export const initialState = {
  linkedInstructors: null,
  battalionCode: null
};

const battalionUsersReducer = createReducer(
  initialState,
  on(battalionUserAction.setBattalionUsers, (state, data: any) => ({...state, linkedInstructors: data.linkedInstructors, battalionCode: data.battalionCode}))
);

export function reducer(state: State | undefined, action: Action) {
  return battalionUsersReducer(state, action);
}
