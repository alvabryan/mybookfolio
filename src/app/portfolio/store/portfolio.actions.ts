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

export const deleteFile = createAction('[Instructor Portfolio] delete file from db', props<{filesData: any, fileIndex: number, pageName: string}>());

export const uploadFile = createAction('[Portfolio file] file upload', props<{fileName: string, file: any, description: string}>());

export const uploadingFile = createAction('[Portfolio uploading] file upload');

export const fileUploadEditorUpdate = createAction('[Portfolio file editor] editor upload', props<{editorText: string}>());

export const resetUploadFileStatus = createAction('[Portfolio reset] file upload');

export const fourYearGoalsUpdate = createAction('[Portfolio yearlyGaols] update', props<{yearlyGoals: string}>());

export const postSecondaryGoalsUpdate = createAction('[Portfolio postSecondary] update', props<{postSecondaryGoals: string}>());

export const winningColorsUpdate = createAction('[Portfolio update] winning colors', props<{winningColorsData: any}>());

export const learningStyleUpdate = createAction('[Portfoli update] learning style', props<{learningStyleData: any}>());

export const personalAdUpdate = createAction('[Portfolio update] personal ad', props<{personalAd: string}>());

export const humanGraphUpdate = createAction('[Portfolio update] human graph', props<{humanGraphData: any}>());

export const FinancialPlanningModuleUpdate = createAction('[Portfolio update] module 1', props<{moduleData: any}>());

export const onReload = createAction('[Instructor Portfolio] on reload set data');


