import { Action } from '@ngrx/store';

export const LOGOUT = '[App] logout';

export class Logout implements Action {
    readonly type = LOGOUT;
}

export const LogoutActions = Logout;
