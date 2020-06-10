import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom, combineAll, take } from 'rxjs/operators';
import { EMPTY, of, from, forkJoin, combineLatest } from 'rxjs';


// ngrx actions
import * as SearchCadetActions from './searchCadet.actions';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/index';
import { firestore } from 'firebase/app';
import * as firebase from 'firebase/app';

@Injectable()
export class SearchCadetEffects {

  deleteCadet = createEffect(() => this.actions$.pipe(
    ofType(SearchCadetActions.deleteCadet),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {

      // battalion code
      const battalionCode = data[1].user.battalionCode;

      // cadet uid
      const cadetUid = data[0].cadetUid;

      try {
        return combineLatest(
          from(this.db.collection('battalions').doc(battalionCode).collection('cadetsProgress').valueChanges()),
          from(this.db.collection('battalions').doc(battalionCode).collection('cadetDataSheet').valueChanges())
          ).pipe(tap((rdata: any) => {
            console.log(rdata);
            console.log(rdata[1][0][cadetUid]);
            console.log(rdata[0][0][cadetUid]);
          }), map((rdata: any) => {
            const currentCadetProgress = rdata[0][0][cadetUid];
            const currentCadetDataSheet = rdata[1][0][cadetUid];

            if (currentCadetDataSheet && currentCadetProgress) {
              // tslint:disable-next-line: object-literal-shorthand
              return SearchCadetActions.transferData({cadetUid: cadetUid, data: [currentCadetProgress, currentCadetDataSheet]});
            } else {
              return SearchCadetActions.transferError();
            }

        }));
      } catch (error) {
        console.log(error);
      }

    })
  ));

  transferCadet = createEffect(() => this.actions$.pipe(
    ofType(SearchCadetActions.transferData),
    withLatestFrom(this.store.select('auth')),
    switchMap(data => {
      const cadetData = data[0].data;
      const cadetUid = data[0].cadetUid;
      const cadetDataSheet = cadetData[1];
      const cadetsProgress = cadetData[0];


      try {
        return combineLatest(
          from(this.db.collection('users').doc(cadetUid).set({data: {battalionCode: 'Pending'}}, {merge: true})),
          from(this.db.collection('battalions').doc('Pending').collection('cadetDataSheet').doc('Pending').set({[cadetUid]: cadetDataSheet}, {merge: true})),
          from(this.db.collection('battalions').doc('Pending').collection('cadetsProgress').doc('Pending').set({[cadetUid]: cadetsProgress}, {merge: true}))
        ).pipe(map(() => {
          return SearchCadetActions.transferSuccessful({cadetUid});
        }));
      } catch (error) {
        console.log(error);
      }

    })
  ));

  transferSuccess = createEffect(() => this.actions$.pipe(
    ofType(SearchCadetActions.transferSuccessful),
    withLatestFrom(this.store.select('auth')),
    tap((data) => {
      // battalion code
      const battalionCode = data[1].user.battalionCode;
      // cadet uid
      const cadetUid = data[0].cadetUid;

      combineLatest(
        from(this.db.collection('battalions').doc(battalionCode).collection('cadetsProgress').doc(battalionCode).update({[cadetUid]: firestore.FieldValue.delete()})),
        from(this.db.collection('battalions').doc(battalionCode).collection('cadetDataSheet').doc(battalionCode).update({[cadetUid]: firestore.FieldValue.delete()}))
      );
    })
  ), {dispatch: false});

  constructor(private actions$: Actions , private db: AngularFirestore, private store: Store<fromRoot.State>) {}
}
