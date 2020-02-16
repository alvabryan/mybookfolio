import * as fromPortfolioReducer from './portfolio.reducer';
import * as fromRoot from '../../store/index';

export interface PortfolioState {
  portfolio: fromPortfolioReducer.State;
}

export interface State extends fromRoot.State {
  portfolio: PortfolioState;
}

export const reducers = fromPortfolioReducer.reducer;

