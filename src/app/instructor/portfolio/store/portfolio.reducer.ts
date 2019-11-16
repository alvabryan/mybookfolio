import { createReducer, on, Action } from '@ngrx/store'
import * as PortfolioActions from './portfolio.actions';

export interface State {
    cadetSearchData: {
        uid: string,
        firstName: string,
        lastName: string,
        letLevel: string
    },
    viewData: {view: string, [key: string]: any},
    pageName: string
}

export const initialState: State = {
    cadetSearchData: null,
    viewData: null,
    pageName: null
}

const portfolioReducer = createReducer(
    initialState,
    on(PortfolioActions.searchCadet, (state, data: any) => ({...state, cadetSearchData: {
        uid: data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        letLevel: data.letLevel
    }})),
    on(PortfolioActions.setPortfolioPageType, (state, data: any) => ({...state, pageName: data.pageName}))
)

export function reducer(state: State | undefined, action: Action){
    return portfolioReducer(state, action);
}