import * as battalionUserAction from './battalion-users.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  linkedInstructors: any;
  cadetStaff: any;
}

export const initialState = {
  linkedInstructors: null,
  cadetStaff: null
};

const battalionUsersReducer = createReducer(
  initialState,
  on(battalionUserAction.setBattalionUsers, (state, data: any) => ({...state, linkedInstructors: data.linkedInstructors, cadetStaff: data.cadetStaff}))
);

export function reducer(state: State | undefined, action: Action) {
  return battalionUsersReducer(state, action);
}
