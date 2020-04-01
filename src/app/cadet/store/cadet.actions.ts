import { createAction, props } from '@ngrx/store';

export const onCadetReload = createAction('[cadet] reload data');
export const setReloadData = createAction('[cadet] reload data');


export const getCadetData = createAction('[cadet] get cadet data');
export const setCadetData = createAction('[cadet] set cadet data', props<{data: any}>());

export const getCadetProgress = createAction('[cadet] get cadet progress data');
export const setCadetProgress = createAction('[cadet] set cadet progress', props<{cadetProgress: any}>());
