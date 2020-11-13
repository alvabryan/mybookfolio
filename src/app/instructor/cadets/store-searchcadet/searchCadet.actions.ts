import { createAction, props } from '@ngrx/store';

export const setSearchCadet = createAction('[Instructor Portfolio] set search cadet', props<{
    uid: string,
    firstName: string,
    lastName: string,
    letLevel: number,
    period: number
}>());
