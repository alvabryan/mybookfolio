import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as fromCadet from './index';
import * as CadetActions from './cadet.actions';
import { withLatestFrom, switchMap, map, take } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CadetEffects {

  getCadetData = createEffect(() => this.actions$.pipe(
    ofType(CadetActions.getCadetData),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {
      const userUid = data[1].user.uid;
      if (userUid) {
        return from(this.db.collection('users').doc(userUid).valueChanges()).pipe(map((rData: any) => {
          return {...rData.data, uid: userUid};
        }), map((returnedData: any) => {
          return CadetActions.setCadetData({data: returnedData});
        }));
      }

      return EMPTY;
    })
  ));


  getCadetProgress = createEffect(() => this.actions$.pipe(
    ofType(CadetActions.getCadetProgress),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {
      const userUid = data[1].user.uid;
      const battalionCode = data[1].user.battalionCode;

      return from(this.db.doc(`battalions/${battalionCode}`).collection('cadetsProgress').doc(`${battalionCode}`).valueChanges()).pipe(map((returnedData: any) => {
        if (returnedData[userUid]) {
          const cadetProgressData = returnedData[userUid];
          return CadetActions.setCadetProgress({cadetProgress: cadetProgressData});
        } else {
          return {type: 'error'};
        }
      }));

    })
  ));

  setCadetDataSheet = createEffect(() => this.actions$.pipe(
    ofType(CadetActions.setCadetDataSheet),
    withLatestFrom(this.store.select('auth'), this.store.select('cadet')),
    tap((data: any) => {
      const userUid = data[1].user.uid;
      const battalionCode = data[1].user.battalionCode;

      const cadetData = data[0].data;

      const cadetStoreData = data[2].cadetData;
      return from(this.db.doc(`battalions/${battalionCode}`).collection('cadetDataSheet').doc(`${battalionCode}`).set({
        [userUid]: {
          firstName: cadetStoreData.firstName,
          lastName: cadetStoreData.lastName,
          period: cadetStoreData.period,
          letLevel: cadetStoreData.letLevel,
          ...cadetData
        }
      }, {merge: true}));
    })
  ), {dispatch: false});

  getCadetDataSheet = createEffect(() => this.actions$.pipe(
    ofType(CadetActions.getCadetDataSheet),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {
      const battalionCode = data[1].user.battalionCode;
      const userUid = data[1].user.uid;

      return from(this.db.doc(`battalions/${battalionCode}`).collection('cadetDataSheet').doc(battalionCode).valueChanges()).pipe(map((newData: any) => {
        return newData[userUid];
      }), map((newData: any) => CadetActions.loadCadetDataSheet({data: newData})));
    })
  ));

  getReminders = createEffect(() => this.actions$.pipe(
    ofType(CadetActions.getReminders),
    withLatestFrom(this.store.select('auth'), this.store.select('cadet')),
    switchMap((data: any) => {
      // battalion code
      const battalionCode = data[1].user.battalionCode;
      const cadetLet = data[1].user.letAssigned;
      const period = data[2].cadet.cadetData.period;
      const showToCadet = `${battalionCode}Let${cadetLet}`;

      // 7 days back
      const uploadDate = new Date().getTime() - 2592000000;
      const lastMonth = new Date(uploadDate);

      return from(this.db.collection('battalions').doc(battalionCode).collection('reminders', ref => {
        return ref.where('showTo', 'array-contains-any', [showToCadet, battalionCode]);
        // .where('dateSent', '>=', lastMonth)
      }).valueChanges({ idField: 'id'})).pipe(take(1), map((dataa: any) => {
        return CadetActions.setReminders({reminders: dataa});
      }));

    })
  ));

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private store: Store<fromCadet.State>
  ) {}
}

