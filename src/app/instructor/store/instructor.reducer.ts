import { createReducer, on, Action } from '@ngrx/store';
import * as InstructorActions from './instructor.actions';

export interface State {
  cadetProgress: string;
  cadetDataSheet: {[key: string]: any};
}

export const initialState = {
  cadetProgress: null,
  cadetDataSheet: null
};

const instructorReducer = createReducer(
  initialState,
  on(InstructorActions.setCadetProgress, (state, cadetProgress: any) => {
    // ({...state, cadetProgress: cadetProgress.progress}
    const cadetProgressData = {};
    const cadetProgressArray = Object.values(cadetProgress.progress);
    const cadetProgressKeys = Object.keys(cadetProgress.progress);

    cadetProgressArray.forEach((data: any, index) => {
      const newObjectData = data;
      newObjectData.uid = cadetProgressKeys[index];
      cadetProgressData[cadetProgressKeys[index]] = newObjectData;
    });

    return {
      ...state,
      cadetProgress: cadetProgressData
    };
  }),
  on(InstructorActions.loadCadetDataSheet, (state, cadetData: any) => {
    const newCadetDataSheet = {};
    const cadetDataSheetValues = Object.values(cadetData.data);
    const cadetDataSheetKeys = Object.keys(cadetData.data);

    cadetDataSheetValues.forEach((data: any, index) => {
      const newObjectData = data;
      newObjectData.uid = cadetDataSheetKeys[index];
      newCadetDataSheet[cadetDataSheetKeys[index]] = newObjectData;
    });

    return {
      ...state,
      cadetDataSheet: newCadetDataSheet
    };
  })
);


export function reducer(state: State | undefined, action: Action) {
  return instructorReducer(state, action);
}
