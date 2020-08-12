import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import * as fromCadet from '../../store/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as cadetCustomCardActions from './custom-cards.actions';
import { tap, withLatestFrom, switchMap, map } from 'rxjs/operators';
import { from, EMPTY } from 'rxjs';

@Injectable()
export class CustomCardEffects {

  getAssignments = createEffect(() => this.actions$.pipe(
    ofType(cadetCustomCardActions.getAssignments),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;

      return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').valueChanges({idField: 'id'})).pipe(map((returnedAssignments) => {
        return cadetCustomCardActions.setAssignments({assignments: returnedAssignments});
      }));
    })
  ));

  constructor(private store: Store<fromCadet.State>, private db: AngularFirestore, private actions$: Actions) {}
}
