import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';

// portfolio actions
import * as PortfolioActions from './portfolio.actions';
import { tap, switchMap, withLatestFrom, map } from 'rxjs/operators';
import { EMPTY, of, from, Observable } from 'rxjs';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PortfolioEffects {

    saveDataLocal = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.searchCadet),
        tap((data)=>{
            localStorage.setItem('searchCadetData', JSON.stringify(data))
        })
    ), {dispatch: false})

    loadSearchData = createEffect(()=>this.actions$.pipe(
        ofType(PortfolioActions.searchCadetLoad),
        ()=>{
            const searchData = JSON.parse(localStorage.getItem('searchCadetData'));
            if(searchData){
                return of(PortfolioActions.searchCadet(searchData));
            }else {
                return EMPTY;
            }
        }
    ))



    getCadetPortfolioData = createEffect(()=>this.actions$.pipe(
        ofType(PortfolioActions.setPortfolioPageType),
        withLatestFrom(this.store.select('instructor')),
        map(data => {
            return {
                'pageName': data[0].pageName,
                'uid': data[1].portfolio.cadetSearchData.uid
            }
        }),
        switchMap((data: any) => {
            
            if(data.pageName === 'Four Year Goals'){
                return from(this.db.collection(`portfolio/${data.uid}/yearlyGoals`).doc(`${data.uid}`).valueChanges()).pipe(map((data)=>{
                    return PortfolioActions.searchCadetData(data)
                }))
            }

            if(data.pageName === 'Learning Style Inventory'){
                return from(this.db.collection(`portfolio/${data.uid}/learningStyle`).doc(`${data.uid}`).valueChanges()).pipe(map((data)=>{
                    return PortfolioActions.searchCadetData(data)
                }))
            }

            // needs restructure of data
            if(data.pageName === 'Success Profiler'){
                return from(this.db.collection(`portfolio/${data.uid}/successProfiler`).doc(`${data.uid}`).collection(`let1`).doc(`qBOwfh4FlNPAmZbQ3cXn`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data)
                }))
            }

            if(data.pageName === 'Winning Colors'){
                return from(this.db.collection(`portfolio/${data.uid}/winningColors`).doc(`${data.uid}`).valueChanges()).pipe(map((data)=>{
                    return PortfolioActions.searchCadetData(data)
                }))
            }

            return EMPTY;
        })
    ))

    constructor(private actions$: Actions, private store: Store<fromInstructor.State>, private db: AngularFirestore){}
}