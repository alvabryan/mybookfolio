import { Injectable } from '@angular/core';

import * as fromRoot from '../../../store';
import * as fromInstructor from '../../store/index';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import * as customCardActions from './custom-cards.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap, withLatestFrom, map } from 'rxjs/operators';
import { EMPTY, from } from 'rxjs';

@Injectable()
export class CustomCardEffects {

  getAssignments = createEffect(() => this.actions$.pipe(
    ofType(customCardActions.getAssignments),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;

      return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').valueChanges()).pipe(map((assignmentsData) => {
        return customCardActions.setAssignments({assignments: assignmentsData});
      }));
    })
  ));

  setAssignments = createEffect(() => this.actions$.pipe(
    ofType(customCardActions.setAssignments),
    tap((data) => {
      console.log(data);
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private store: Store<fromInstructor.State>,
    private db: AngularFirestore,
    ) {}
}
