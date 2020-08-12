import { createAction, props } from '@ngrx/store';


export const getAssignments = createAction('[Custom Cards] get assignments');
export const setAssignments = createAction('[Custom Cards] set assignments', props<{assignments: any}>());

export const createAssignment = createAction('[Custom Cards] create assignment', props<{newAssignment: any}>());
export const setAssignmentLoadingStatus = createAction('[Custom Cards] set loading status', props<{loading: boolean}>());
