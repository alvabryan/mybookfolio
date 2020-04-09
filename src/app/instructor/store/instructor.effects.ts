import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';


// ngrx actions
import * as InstructorActions from './instructor.actions';
import * as InstructorSearchCadetActions from '../cadets/store-searchcadet/searchCadet.actions';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/index';


@Injectable()
export class InstructorEffects {

    getCadetProgress = createEffect(() => this.actions$.pipe(
        ofType(InstructorActions.getCadetProgress),
        withLatestFrom(this.store.select('auth')),
        map(data => data[1].user ),
        switchMap((data: any) => {
            return this.db.doc(`battalions/${data.battalionCode}/cadetsProgress/${data.battalionCode}`).valueChanges().pipe(map((dataa: any) => {
                return InstructorActions.setCadetProgress({progress: dataa});
              }));
        })
    ));

    onReload = createEffect(() => this.actions$.pipe(
      ofType(InstructorActions.onReload),
      switchMap(() => {
        const userData = JSON.parse(localStorage.getItem('searchCadetData'));

        if (userData) {
          return of(InstructorSearchCadetActions.setSearchCadet({
            cadetData: {
              uid: userData.uid,
              firstName: userData.firstName,
              lastName: userData.lastName,
              letLevel: userData.letLevel
            }
          }));
      } else {
          return EMPTY;
      }
      })
    ));

    constructor(private actions$: Actions , private db: AngularFirestore, private store: Store<fromRoot.State>) {}
}
