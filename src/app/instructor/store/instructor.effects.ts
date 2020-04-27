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

  getCadetDataSheet = createEffect(() => this.actions$.pipe(
    ofType(InstructorActions.getCadetDataSheet),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {
      const battalionCode = data[1].user.battalionCode;
      return from(this.db.doc(`battalions/${battalionCode}`).collection('cadetDataSheet')
      .doc(battalionCode).valueChanges()).pipe(map((returnedData) => {
        const returnDataLength = Object.keys(returnedData).length;
        if (returnDataLength > 0) {
          return InstructorActions.loadCadetDataSheet({data: returnedData});
        } else {
          return InstructorActions.loadCadetDataSheet({data: {}});
        }
      }));
    })
  ));

  updateDataSheet = createEffect(() => this.actions$.pipe(
    ofType(InstructorActions.updateDataSheet),
    withLatestFrom(this.store.select('auth'), this.store.select('instructor')),
    tap((data: any) => {
      const battalionCode = data[1].user.battalionCode;
      const cadetData = data[0].data;
      const uid = data[2].currentCadet.cadetSearchData.uid;
      forkJoin(
        from(this.db.collection('users').doc(uid).set({
          data: {
            firstName: cadetData.firstName,
            lastName: cadetData.lastName,
            letLevel: +cadetData.letLevel,
            period: +cadetData.period
          }
        }, {merge: true})),
        from(this.db.doc(`battalions/${battalionCode}`).collection('cadetsProgress').doc(battalionCode).set({
          [uid]: {
            firstName: cadetData.firstName,
            lastName: cadetData.lastName,
            letLevel: +cadetData.letLevel,
            period: +cadetData.period
          }
        }, {merge: true})),
        from(this.db.doc(`battalions/${battalionCode}`).collection('cadetDataSheet').doc(battalionCode).set({
          [uid]: cadetData
        }, {merge: true}))
      );
    })
  ), {dispatch: false});

  onReload = createEffect(() => this.actions$.pipe(
    ofType(InstructorActions.onReload),
    switchMap(() => {
      const userData = JSON.parse(localStorage.getItem('searchCadetData'));

      if (userData) {
        return of(InstructorSearchCadetActions.setSearchCadet({
            uid: userData.uid,
            firstName: userData.firstName,
            lastName: userData.lastName,
            letLevel: userData.letLevel
        }));
    } else {
        return EMPTY;
    }
    })
  ));

  constructor(private actions$: Actions , private db: AngularFirestore, private store: Store<fromInstructor.State>) {}
}
