import { createAction, props } from '@ngrx/store';

export const getAssignments = createAction('[cadet custom cards] get assignments');
export const setAssignments = createAction('[cadet custom cards] set assignments', props<{assignments: any}>());

export const submitAssignment = createAction('[cadet custom cards] submit assignment', props<{submission: {file: any, comment: string, assignmentId: string}}>());
export const setLoadingStatus = createAction('[cadet custom cards] set loading status');
export const resetUploadFileStatus = createAction('[cadet custom cards] reset loading status');


export const getCadetSubmission = createAction('[cadet custom cards] get cadet submission', props<{assignmentId: string}>());
export const setCadetSubmission = createAction('[cadet cusom cards] set cadet submission', props<{submission: any}>());

export const deleteSubmission = createAction('[cadet custom cards] delete submission', props<{currentAssignmentId: string, fileDownloadUrl: string}>());
