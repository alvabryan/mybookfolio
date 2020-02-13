import * as fromRoot from '../../store/index';
import * as InstructorReducer from './instructor.reducer';
import * as PortfolioReducer from '../../portfolio/store/portfolio.reducer';
import * as battalionUsersReducer from '../battalion-users/store/battalion-users.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface InstructorState {
    cadetRoster: InstructorReducer.State;
    portfolio: PortfolioReducer.State;
    battalionUsers: battalionUsersReducer.State;
}

export interface State extends fromRoot.State {
    instructor: InstructorState;
}

export const reducers = {
    cadetData: InstructorReducer.reducer,
    portfolio: PortfolioReducer.reducer,
    battalionUsers: battalionUsersReducer.reducer
};

// instructor reducer selector
export const instructorSelector = createFeatureSelector<InstructorState>('instructor');


// auth reducer selectors
export const authSelector = createFeatureSelector<fromAuth.State>('auth');

export const authUserSelector = createSelector(
    authSelector,
    (state: fromAuth.State) => state.user
);
