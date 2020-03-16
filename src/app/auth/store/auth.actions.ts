import { createAction, props } from '@ngrx/store';

// login

export const loginStart = createAction('[Auth] login Start', props<{email: string, password: string}>());

export const authenticationSuccess = createAction('[Auth] Authenticate Success', props<{
    userType: string,
    displayName: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    photoUrl: string,
    providerId: string,
    battalionCode: string,
    uid: string,
    letAssigned: any
}>());

export const authenticateFail = createAction('[Auth] Authenticate Fail', props<{error: string}>());

export const refreshWindow = createAction('[Auth] Refresh Window');

// cadet sign up
export const cadetSignupStart = createAction('[Auth] Check Battalion Code', props<{[key: string]: any}>());

export const cadetRegister = createAction('[Auth] Signup Start', props<{
    battalionCode: string,
    firstName: string,
    lastName: string,
    email: string,
    letLevel: number,
    period: number,
    password: string
}>());

export const cadetSignupSuccess = createAction('[Auth] Signup Success', props<{[key: string]: any}>());

// auth error
export const clearError = createAction('[Auth] Clear Error');

// change profile image
export const imageUpload = createAction('[User Settings] Image Upload', props<{image: any}>());
export const imageUploadLoading = createAction('[User Settings] profile loading');
export const changeProfileImage = createAction('[User Settings] profile image', props<{imageUrl: any}>());

// update firstname and lastname
export const updateUserInfo = createAction('[User Settings] profile name', props<{firstName: string, lastName: string}>());

// update cadet data
export const updateCadetInfo = createAction('[User Cadet] update personal data', props<{newPersonalData: any}>());

// update cadet battalion code
export const updateBattalionCode = createAction('[User Cadet] update battalion code', props<{newBattalionCode: string}>());

// password update
export const passwordUpdate = createAction('[User Settings] update password', props<{oldPassword: string, newPassword: string}>());
export const passwordUpdateStatus = createAction('[User Settings] update status', props<{status: string}>());


// update let assign
export const updateLetAssign = createAction('[User update] let assign', props<{letAssigned: Array<any>}>());
