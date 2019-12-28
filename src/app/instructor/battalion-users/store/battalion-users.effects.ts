import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as battalionUsersAction from './battalion-users.actions';
import { EMPTY, of } from 'rxjs';
import { map, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';

// ngrx from root
import * as fromRoot from '../../../store/index';

@Injectable()
export class BattalionUsersEFfect {


  getBattalionUsers = createEffect(() => this.actions$.pipe(
    ofType(battalionUsersAction.getBattalionUsers),
    withLatestFrom(this.store.select('auth')),
    map(data => data[1].user),
    switchMap((data: any) => {
      return this.db.doc(`battalions/${data.battalionCode}`).valueChanges().pipe(map((dataa: any) => {
        return battalionUsersAction.setBattalionUsers({linkedInstructors: dataa.instructors, cadetStaff: dataa.cadetStaff});
      }));
    })
    ));

  constructor(private actions$: Actions, private store: Store<fromRoot.State>, private db: AngularFirestore) {}
}
