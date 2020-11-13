import { createAction, props } from '@ngrx/store';

// login

export const loginStart = createAction('[Auth] login Start', props<{email: string, password: string}>());

export const adInstructorLogin = createAction('[Auth] instructor login', props<{emai: string}>());

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
    letAssigned: any,
    approved: boolean
}>());

export const authenticateFail = createAction('[Auth] Authenticate Fail', props<{error: any}>());

export const refreshWindow = createAction('[Auth] Refresh Window');

// battalion registration
export const battalionRegisterStart = createAction('[Auth] Battalion Registrato', props<{registrationType: string, [key: string]: any}>());

export const battalionRegister = createAction('[Auth] Battalion register start', props<{[key: string]: any}>());

export const battalionRegisterSuccess = createAction('[Auth] battalion success', props<{[key: string]: any}>());

export const battalionInstructorRegisterSuccess = createAction('[Auth] battalion success', props<{[key: string]: any}>());

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
export const updateBattalionCode = createAction('[User Cadet] update battalion code', props<{newBattalionCode: string, cadetUid: string}>());
export const updateCode = createAction('[user Cadet] code');
export const updateCodeExist = createAction('[user Cadet] code', props<{newBattalionCode: string, oldBattalionCode: string, cadetUid: string}>());
export const updateCodeDataRetrieved = createAction('[user code] data retrieved', props<{newBattalionCode: string, cadetsProgress: any, cadetUid: string}>());
export const updateCodeError = createAction('[user update] error');
export const updateCodeSuccess = createAction('[user update] update successful', props<{newBattalionCode: string}>());

// password update
export const passwordUpdate = createAction('[User Settings] update password', props<{oldPassword: string, newPassword: string}>());
export const passwordUpdateStatus = createAction('[User Settings] update status', props<{status: string}>());
export const passwordReset = createAction('[User password] password reset', props<{email: string}>());
// update let assign
export const updateLetAssign = createAction('[User update] let assign', props<{letAssigned: Array<any>}>());
