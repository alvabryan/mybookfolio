import { createReducer, on, Action } from '@ngrx/store';
import * as InstructorActions from './instructor.actions';

export interface State {
    cadetRoster: string;
    cadetProgress: string;
}

export const initialState = {
    cadetRoster: null,
    cadetProgress: null
};

const instructorReducer = createReducer(
    initialState,
    on(InstructorActions.setCadetData, (state, cadetRoster: any) => ({...state, cadetRoster: cadetRoster.roster})),
    on(InstructorActions.setCadetProgress, (state, cadetProgress: any) => {
      // ({...state, cadetProgress: cadetProgress.progress}
      const cadetProgressData = [];
      const cadetProgressArray = Object.values(cadetProgress.progress);
      const cadetProgressKeys = Object.keys(cadetProgress.progress);

      cadetProgressArray.forEach((data: any, index) => {
        const newObjectData = data;
        newObjectData.uid = cadetProgressKeys[index];
        cadetProgressData.push(newObjectData);
      });

      return {
        ...state,
        cadetProgress: cadetProgressData
      };
}));


export function reducer(state: State | undefined, action: Action) {
    return instructorReducer(state, action);
}
