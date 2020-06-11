import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
  uploadingProfileImage: boolean;
  passwordUpdateStatus: string;
  registration: {
    authError: null,
    battalionCodeStatus: null
  };
}

export const initialState: State = {
    user: null,
    authError: null,
    loading: false,
    uploadingProfileImage: false,
    passwordUpdateStatus: null,
    registration: {
      authError: null,
      battalionCodeStatus: null
    }
};

const authReducer = createReducer(
    initialState,
    on(AuthActions.authenticationSuccess, (state, auth: any) => {
      const userData = new User(auth.userType, auth.displayName, auth.firstName, auth.lastName, auth.email, auth.phoneNumber, auth.photoUrl, auth.providerId, auth.battalionCode, auth.uid, auth.letAssigned );
      return {
        ...state,
        authError: null,
        user: userData,
        loading: false
      };
    }),
    on(AuthActions.loginStart, state => ({...state, authError: null, loading: true})),
    on(AuthActions.cadetRegister, state => ({...state, authError: null, loading: true})),
    // tslint:disable-next-line: object-literal-shorthand
    on(AuthActions.authenticateFail, (state, authError: any) => ({...state, user: null, authError: authError.error, loading: false})),
    // on(AuthActions.clearError, state => ({...state, authError: null})),
    on(AuthActions.imageUpload, state => ({...state, uploadingProfileImage: true})),
    on(AuthActions.changeProfileImage, (state, data: any) => {
      const user = state.user;
      user.photoUrl = data.imageUrl;
      return {
        ...state,
        // tslint:disable-next-line: object-literal-shorthand
        user: user,
        uploadingProfileImage: false
      };
    }),
    on(AuthActions.passwordUpdateStatus, (state, data: any) => ({...state, passwordUpdateStatus: data.status })),
    on(AuthActions.updateLetAssign, (state, data: any) => {
      const newUser = state.user;
      newUser.letAssigned = data.letAssigned;
      return {
        ...state,
        user: newUser
      };
    }),
    on(AuthActions.updateCodeSuccess, (state, data: any) => {
      const newUserCode = state.user;
      if (newUserCode.userType === 'cadet') {
        newUserCode.battalionCode = data.newBattalionCode;
      }
      return {
        ...state,
        user: newUserCode
      };
    })
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
