import { createReducer, on, Action } from '@ngrx/store';
import * as PortfolioActions from './portfolio.actions';

export interface State {
  cadetSearchData: {
    uid: string,
    firstName: string,
    lastName: string,
    letLevel: string
  };
  viewData: { [key: string]: any };
  pageName: string;
  uploading: string;
  error: any;
}

export const initialState: State = {
  cadetSearchData: null,
  viewData: null,
  pageName: null,
  uploading: 'not submitted',
  error: null
};

const portfolioReducer = createReducer(
  initialState,
  on(PortfolioActions.searchCadet, (state, data: any) => ({
    ...state, cadetSearchData: {
      uid: data.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      letLevel: data.letLevel,
      period: data.period
    }
  })),
  on(PortfolioActions.setPortfolioPageType, (state, data: any) => ({ ...state, pageName: data.pageName, viewData: null})),
  on(PortfolioActions.searchCadetData, (state, data: any) => ({
    ...state, viewData: {
      let1: data.let1,
      let2: data.let2,
      let3: data.let3,
      let4: data.let4
    }
  })),
  on(PortfolioActions.updateCadetSearchLetLevel, (state, data: any) => {
    const user = state.cadetSearchData;
    user.letLevel = data.letLevel;

    return {
      ...state,
      cadetSearchData: user
    };
  }),
  on(PortfolioActions.clearUserPortfolio, (state) => {
    return {
      ...state,
      viewData: null,
      pageName: null
    };
  }),
  on(PortfolioActions.uploadFile, (state) => ({...state, uploading: 'uploading'})),
  on(PortfolioActions.uploadingFile, (state) => ({...state, uploading: 'uploaded'})),
  on(PortfolioActions.resetUploadFileStatus, (state) => ({...state, uploading: 'not submitted', error: null})),
  on(PortfolioActions.fileUploadError, (state, data) => ({...state, uploading: 'error', error: data.error }))
);

export function reducer(state: State | undefined, action: Action) {
  return portfolioReducer(state, action);
}
