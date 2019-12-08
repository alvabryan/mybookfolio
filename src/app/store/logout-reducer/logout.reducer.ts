import * as ActionTypes from './logout.actions';
import { MetaReducer } from '@ngrx/store';

export function clearState(reducer) {
    return function (state, action) {
  
      if (action.type === ActionTypes.LOGOUT) {
        state = undefined;
      }
  
      return reducer(state, action);
    };
  }

export const metaReducers: MetaReducer<any>[] = [clearState];