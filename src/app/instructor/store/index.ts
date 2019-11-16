import * as fromRoot from '../../store/index';
import * as InstructorReducer from './instructor.reducer';
import * as PortfolioReducer from '../portfolio/store/portfolio.reducer';

export interface InstructorState {
    cadetRoster: InstructorReducer.State,
    portfolio: PortfolioReducer.State
}

export interface State extends fromRoot.State {
    instructor: InstructorState
}

export const reducers = {
    cadetData: InstructorReducer.reducer,
    portfolio: PortfolioReducer.reducer
}
