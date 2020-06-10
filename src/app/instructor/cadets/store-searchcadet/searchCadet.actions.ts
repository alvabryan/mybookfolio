import { createAction, props } from '@ngrx/store';

export const setSearchCadet = createAction('[Instructor Portfolio] set search cadet', props<{
    uid: string,
    firstName: string,
    lastName: string,
    letLevel: number
}>());


export const deleteCadet = createAction('[Instructor] delete cadet', props<{cadetUid: string}>());
export const transferData = createAction('[Instructor]', props<{cadetUid: string, data: any}>());
export const transferSuccessful = createAction('[Instructor]', props<{cadetUid: string}>());
export const transferError = createAction('[Instructor] Error');
