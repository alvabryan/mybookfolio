import {createAction, props} from '@ngrx/store';

interface LetLevelAssigned {
  let1: boolean;
  let2: boolean;
  let3: boolean;
  let4: boolean;
}

export const getBattalionUsers = createAction('[battalionUsers] get users');
export const setBattalionUsers = createAction('[battalionUsers] set users', props<{linkedInstructors: any, cadetStaff: any}>());

export const updateInstructorLetAssign = createAction('[battalionUsers] update let assigned', props<{instructorUid: string, letAssigned: LetLevelAssigned}>());

