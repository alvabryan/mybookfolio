import { createReducer, on, Action } from '@ngrx/store';
import * as InstructorActions from './instructor.actions';

export interface State {
  cadetProgress: string;
  cadetDataSheet: {[key: string]: any};
}

export const initialState = {
  cadetProgress: null
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
  })
);


export function reducer(state: State | undefined, action: Action) {
  return instructorReducer(state, action);
}
