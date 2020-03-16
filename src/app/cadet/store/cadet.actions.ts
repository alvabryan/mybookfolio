import { createAction, props } from '@ngrx/store';

export const onCadetReload = createAction('[cadet] reload data');
export const setReloadData = createAction('[cadet] reload data');


export const getCadetData = createAction('[cadet] get cadet data');
export const setCadetData = createAction('[cadet] set cadet data', props<{data: any}>());
