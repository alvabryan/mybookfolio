import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';


//ngrx actions
import * as InstructorActions from './instructor.actions';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/index';


@Injectable()
export class InstructorEffects {
    

    getRosterData = createEffect(() => this.actions$.pipe(
        ofType(InstructorActions.getCadetData),
        withLatestFrom(this.store.select('auth')),
        map(data => data[1].user ),
        switchMap((data: any) => {
            return this.db.collection('battalions').doc(`${data.battalionCode}`).collection('cadetsRoster').valueChanges().pipe(map((data)=>{
                return InstructorActions.setCadetData({roster: data[0]});
            }))
        })
    ))


    getCadetProgress = createEffect(()=>this.actions$.pipe(
        ofType(InstructorActions.getCadetProgress),
        withLatestFrom(this.store.select('auth')),
        map(data => data[1].user ),
        switchMap((data: any)=>{
            return this.db.doc(`battalions/${data.battalionCode}/cadetsProgress/${data.battalionCode}`).valueChanges().pipe(map((data: any) => {
                return InstructorActions.setCadetProgress({progress: data})
              }));
        })
    ))

    constructor(private actions$: Actions ,private db: AngularFirestore, private store: Store<fromRoot.State>){}
}