import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
  uploadingProfileImage: boolean;
  passwordUpdateStatus: string;
}

export const initialState: State = {
    user: null,
    authError: null,
    loading: false,
    uploadingProfileImage: false,
    passwordUpdateStatus: null
};

const authReducer = createReducer(
    initialState,
    on(AuthActions.authenticationSuccess, (state, auth:any) => {
      const userData = new User(auth.userType, auth.displayName, auth.firstName, auth.lastName, auth.email, auth.phoneNumber, auth.photoUrl, auth.providerId, auth.battalionCode, auth.uid );
      return {
        ...state,
        authError: null,
        user: userData,
        loading: false
      }
    }),
    on(AuthActions.logout, state => ({...state, user: null, userType: null})),
    on(AuthActions.loginStart, state => ({...state, authError: null, loading: true})),
    on(AuthActions.cadetRegister, state => ({...state, authError: null, loading: true})),
    on(AuthActions.authenticateFail, (state, authError: any) => ({...state, user: null, authError: authError, loading: false})),
    on(AuthActions.clearError, state => ({...state, authError: null})),
    on(AuthActions.imageUpload, state => ({...state, uploadingProfileImage: true})),
    on(AuthActions.changeProfileImage, (state, data: any) => {
      const user = state.user;
      user.photoUrl = data.imageUrl;
      return {
        ...state,
        user: user,
        uploadingProfileImage: false
      }
    }),
    on(AuthActions.updateUserInfo, (state, data: any) => {
      const user = state.user;
      user.displayName = data.firstName + ' ' + data.lastName;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      return {
        ...state,
        user: user
      }
    }),
    on(AuthActions.passwordUpdateStatus, (state, data: any) => ({...state, passwordUpdateStatus: data.status }))
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
  }