import { createAction, props } from '@ngrx/store';

export const searchCadet = createAction('[Portfolio searchCadet] search data', props<{
    uid: string,
    firstName: string,
    lastName: string,
    letLevel: number
}>());


export const searchCadetLoad = createAction('[Portfolio searchCadetLoad] load data when refresh');

export const setPortfolioPageType = createAction('[Portfolio setPageType] page type', props<{pageName: string}>());

export const searchCadetData = createAction('[Portfolio searchCadetData] set data', props<{[key: string]: any}>());

export const updateCadetSearchLetLevel = createAction('[Portfolio updateLetLevel] update let', props<{letLevel: number}>());

export const clearUserPortfolio = createAction('[Portfolio clearPortfolio] clear portfolio');

export const clearCadetPortfolioViewData = createAction('[Instructor Portfolio] clear cadet view data');
