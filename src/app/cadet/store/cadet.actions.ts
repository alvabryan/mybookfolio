import { createAction, props } from '@ngrx/store';

export const test = createAction('[cadet test] test action', props<{name: any}>());
