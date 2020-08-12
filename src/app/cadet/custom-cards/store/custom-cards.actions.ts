import { createAction, props } from '@ngrx/store';

export const getAssignments = createAction('[cadet custom cards] get assignments');
export const setAssignments = createAction('[cadet custom cards] set assignments', props<{assignments: any}>());
