import * as fromRoot from '../../store/index';
import * as InstructorReducer from './instructor.reducer';
import * as battalionUsersReducer from '../battalion-users/store/battalion-users.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromPortfolio from '../../portfolio/store/portfolio.reducer';
import * as searchCadetReducer from '../cadets/store-searchcadet/searchCadet.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface InstructorState {
    cadetData: InstructorReducer.State;
    battalionUsers: battalionUsersReducer.State;
    currentCadet: searchCadetReducer.State;
}

export interface State extends fromRoot.State {
    instructor: InstructorState;
}

export const reducers = {
    cadetData: InstructorReducer.reducer,
    battalionUsers: battalionUsersReducer.reducer,
    currentCadet: searchCadetReducer.reducer
};

// instructor reducer selector
export const instructorSelector = createFeatureSelector<InstructorState>('instructor');


// auth reducer selectors
export const authSelector = createFeatureSelector<fromAuth.State>('auth');

// auth reducer selectors
export const portfolioSelector = createFeatureSelector<fromPortfolio.State>('portfolio');

export const authUserSelector = createSelector(
    authSelector,
    (state: fromAuth.State) => state.user
);
