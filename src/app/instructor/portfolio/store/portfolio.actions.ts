import { createAction, props } from '@ngrx/store';

export const searchCadet = createAction('[Portfolio searchCadet] search data', props<{
    uid: string,
    firstName: string,
    lastName: string,
    letLevel: number
}>())


export const searchCadetLoad = createAction('[Portfolio searchCadetLoad] load data when refresh');

export const setPortfolioPageType = createAction('[Portfolio setPageType] page type', props<{pageName: string}>());

export const searchCadetData = createAction('[Portfolio searchCadetData] set data', props<{[key: string]: any}>());