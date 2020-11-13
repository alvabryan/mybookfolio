import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of, from, forkJoin } from 'rxjs';


// ngrx actions
import * as InstructorActions from './instructor.actions';
import * as InstructorSearchCadetActions from '../cadets/store-searchcadet/searchCadet.actions';
import { Store, select } from '@ngrx/store';

import * as fromInstructor from './index';


@Injectable()
export class InstructorEffects {

  getCadetProgress = createEffect(() => this.actions$.pipe(
      ofType(InstructorActions.getCadetProgress),
      withLatestFrom(this.store.select('auth')),
      map(data => data[1].user ),
      switchMap((data: any) => {
          return this.db.doc(`battalions/${data.battalionCode}/cadetsProgress/${data.battalionCode}`).valueChanges().pipe(map((dataa: any) => {
            const returnDataLength = Object.keys(dataa).length;
            if (returnDataLength > 0) {
              return InstructorActions.setCadetProgress({progress: dataa});
            } else {
              return InstructorActions.setCadetProgress({progress: {}});
            }
          }));
      })
  ));

  onReload = createEffect(() => this.actions$.pipe(
    ofType(InstructorActions.onReload),
    switchMap(() => {
      const userData = JSON.parse(localStorage.getItem('searchCadetData'));

      if (userData) {
        return of(InstructorSearchCadetActions.setSearchCadet({
            uid: userData.uid,
            firstName: userData.firstName,
            lastName: userData.lastName,
            letLevel: userData.letLevel,
            period: userData.period
        }));
    } else {
        return EMPTY;
    }
    })
  ));

  constructor(private actions$: Actions , private db: AngularFirestore, private store: Store<fromInstructor.State>) {}
}
