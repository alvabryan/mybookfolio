import { createAction, props } from '@ngrx/store';

// export const getCadetData = createAction('[Instructor Init] load cadet data');
// export const setCadetData = createAction('[Instructor Init] set cadet data', props<{ [key: string]: any }>());


export const getCadetProgress = createAction('[Instructor Portfolio] load cadet progress');
export const setCadetProgress = createAction('[Instructor Portfolio] set cadet progress', props<{ [key: string]: any }>());

export const getCadetDataSheet = createAction('[Instructor cadets] get cadet data sheet');
export const loadCadetDataSheet = createAction('[Instructor cadets] set data', props<{data: any}>());
export const updateDataSheet = createAction('[Instructor CadetDataSheet] update datasheet', props<{data: any}>());

export const onReload = createAction('[Instructor] Reload');
