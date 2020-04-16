import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of, from } from 'rxjs';


// ngrx actions
import * as SearchCadetActions from './searchCadet.actions';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/index';


@Injectable()
export class SearchCadetEffects {


    constructor(private actions$: Actions , private db: AngularFirestore, private store: Store<fromRoot.State>) {}
}
