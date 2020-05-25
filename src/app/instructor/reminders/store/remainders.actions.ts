import { createAction, props } from '@ngrx/store';

export const sendRemainder = createAction('[Remainders] send message', props<{images: Array<any>, url: string, message: string, let: Array<any>, period: Array<any>}>());
