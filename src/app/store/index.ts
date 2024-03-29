import { ActionReducerMap } from '@ngrx/store';

// auth feature
import * as fromAuth from '../auth/store/auth.reducer';

export interface State {
    auth: fromAuth.State;
}


export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer
};
