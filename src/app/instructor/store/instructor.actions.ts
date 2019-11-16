import { createAction, props } from '@ngrx/store';

export const getCadetData = createAction('[Instructor Init] load cadet data');
export const setCadetData = createAction('[Instructor Init] set cadet data', props<{[key: string]:any}>());


export const getCadetProgress = createAction('[Instructor Portfolio] load cadet progress');
export const setCadetProgress = createAction('[Instructor Portfolio] set cadet progress', props<{[key: string]: any}>());

