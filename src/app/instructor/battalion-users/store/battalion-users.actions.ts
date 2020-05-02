import {createAction, props} from '@ngrx/store';

export const getBattalionUsers = createAction('[battalionUsers] get users');
export const setBattalionUsers = createAction('[battalionUsers] set users', props<{linkedInstructors: any, cadetStaff: any, battalionCode: any}>());

export const updateInstructorLetAssign = createAction('[battalionUsers] update let assigned', props<{instructorUid: string, letAssigned: Array<any>}>());

export const updateInstructorStatus = createAction('[battalion] instructor status update', props<{battalionCode: string, uid: string}>());
