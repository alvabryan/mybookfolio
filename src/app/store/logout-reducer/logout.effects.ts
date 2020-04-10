import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import * as LogoutActions from './logout.actions';
import { tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class LogoutEffect {
    @Effect({dispatch: false})
    logout = this.actions$.pipe(
        ofType(LogoutActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
            localStorage.clear();
        })
    );

    constructor(private actions$: Actions, private router: Router, private afAuth: AngularFireAuth ) {}
}
