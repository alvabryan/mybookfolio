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
import { withLatestFrom, switchMap, map } from 'rxjs/operators';
import { EMPTY, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CadetEffects {

  getCadetData = createEffect(() => this.actions$.pipe(
    ofType(CadetActions.getCadetData),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {
      const userUid = data[1].user.uid;
      if (userUid) {
        return from(this.db.collection('users').doc(userUid).valueChanges()).pipe(map((returnedData: any) => {
          return CadetActions.setCadetData({data: returnedData.data});
        }));
      }

      return EMPTY;
    })
  ));

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}
}

