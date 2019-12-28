import { createReducer, on, Action } from '@ngrx/store';
import * as InstructorActions from './instructor.actions';

export interface State {
    cadetRoster: string;
    cadetProgress: string;
}

export const initialState = {
    cadetRoster: null,
    cadetProgress: null
};

const instructorReducer = createReducer(
    initialState,
    on(InstructorActions.setCadetData, (state, cadetRoster: any) => ({...state, cadetRoster: cadetRoster.roster})),
    on(InstructorActions.setCadetProgress, (state, cadetProgress: any) => ({...state, cadetProgress: cadetProgress.progress}))
);

export function reducer(state: State | undefined, action: Action) {
    return instructorReducer(state, action);
}
