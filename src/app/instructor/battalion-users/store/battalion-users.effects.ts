import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as battalionUsersAction from './battalion-users.actions';
import { EMPTY, of, forkJoin, from } from 'rxjs';
import { map, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';

// ngrx from root
import * as fromRoot from '../../../store/index';
import * as fromAuth from '../../../auth/store/auth.actions';

@Injectable()
export class BattalionUsersEFfect {


  getBattalionUsers = createEffect(() => this.actions$.pipe(
    ofType(battalionUsersAction.getBattalionUsers),
    withLatestFrom(this.store.select('auth')),
    map(data => data[1].user),
    switchMap((data: any) => {
      return this.db.doc(`battalions/${data.battalionCode}`).valueChanges().pipe(map((dataa: any) => {
        return battalionUsersAction.setBattalionUsers({linkedInstructors: dataa.instructors, cadetStaff: dataa.cadetStaff, battalionCode: dataa.battalionCode});
      }));
    })
  ));


  updateInstructorLetLevel = createEffect(() => this.actions$.pipe(
    ofType(battalionUsersAction.updateInstructorLetAssign),
    withLatestFrom(this.store.select('auth')),
    tap((data) => {
      if (data[1].user.battalionCode) {
        // tslint:disable-next-line: quotemark
        const userUid = data[0].instructorUid;
        this.db.doc(`battalions/${data[1].user.battalionCode}`).set({instructors: { [userUid] : { letLevel: data[0].letAssigned } }  }, { merge: true });
        this.db.doc(`users/${data[0].instructorUid}`).set({data: { letLevel: data[0].letAssigned} }, {merge: true});
      }
    }),
    map((data: any) => {
      return fromAuth.updateLetAssign({letAssigned: data[0].letAssigned});
    })
  ));

  updateInstructorApproveStatus = createEffect(() => this.actions$.pipe(
    ofType(battalionUsersAction.updateInstructorStatus),
    tap((data: any) => {
      forkJoin(
        from(this.db.collection('users').doc(data.uid).set({
          data: {
            approved: true
          }
        }, {merge: true})),
        from(this.db.collection('battalions').doc(data.battalionCode).set({
          instructors: {
            [data.uid]: {
              approved: true
            }
          }
        }, {merge: true}))
      );
    })
  ), {dispatch: false});

  constructor(private actions$: Actions, private store: Store<fromRoot.State>, private db: AngularFirestore) {}
}
