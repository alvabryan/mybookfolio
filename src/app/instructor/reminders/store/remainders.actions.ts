import { createAction, props } from '@ngrx/store';

export const getReminders = createAction('[Reminders] get reminders');
export const setReminders = createAction('[Reminders] set reminders', props<{reminders: any}>());

export const deleteReminder = createAction('[Reminders] delete reminder', props<{reminderUid: string}>());

export const sendRemainder = createAction('[Reminders] send message', props<{images: Array<any>, url: string, message: string, let: Array<any>}>());
export const uploadingFile = createAction('[Reminders] uploading file');
