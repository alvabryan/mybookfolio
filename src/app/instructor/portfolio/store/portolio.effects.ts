import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';

// portfolio actions
import * as PortfolioActions from './portfolio.actions';
import { tap, switchMap, withLatestFrom, map } from 'rxjs/operators';
import { EMPTY, of, from } from 'rxjs';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import { AngularFirestore } from '@angular/fire/firestore';

const getPortfolioData = (pageName: string, uid: string) => {
    let returnObservalbe: any;

    switch(pageName){
        case 'Four Year Goals':
                returnObservalbe = from(this.db.collection(`portfolio`).doc(`${uid}`).collection('yearlyGoals').doc(`${uid}`).valueChanges())
            break;
        default:
            returnObservalbe = EMPTY;
    }

    return EMPTY;
}

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
        tap(data => console.log(data)),
        switchMap((data: any) => {
            return getPortfolioData(data.pageName,data.uid)
        })
    ))

    constructor(private actions$: Actions, private store: Store<fromInstructor.State>, private db: AngularFirestore){}
}