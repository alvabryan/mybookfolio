import * as fromRoot from '../../store/index';
import * as fromCadetReducer from './cadet.reducer';

export interface CadetState {
  cadet: any;
}

export interface State extends fromRoot.State {
  cadet: CadetState;
}

export const reducers = fromCadetReducer.reducer;
