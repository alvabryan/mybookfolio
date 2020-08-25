import { createAction, props } from '@ngrx/store';


export const getAssignments = createAction('[Custom Cards] get assignments');
export const setAssignments = createAction('[Custom Cards] set assignments', props<{assignments: any}>());


export const createAssignment = createAction('[Custom Cards] create assignment', props<{newAssignment: any}>());
export const editAssignment = createAction('[Custom Cards] edit assignment', props<{editAssignment: any}>());
export const uploadingStatus = createAction('[Custom Cards] uploading status');
export const resetUploadFileStatus = createAction('[Custom Cards] reset uploading status');

export const getCurrentAssignmentSubmissions = createAction('[Custom Cards] get submissions', props<{assignmentId: string}>());
export const setCurrentAssignmentSubmissions = createAction('[Custom Cards] set submissions', props<{data: any}>());
