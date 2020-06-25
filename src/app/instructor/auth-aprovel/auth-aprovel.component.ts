import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../store/index';
import * as LogoutActions from '../../store/logout-reducer/logout.actions';
import { Subscription, from, EMPTY } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-auth-aprovel',
  templateUrl: './auth-aprovel.component.html',
  styleUrls: ['./auth-aprovel.component.css']
})
export class AuthAprovelComponent implements OnInit {

  subscription: Subscription = new Subscription();
  battalionCode = '';

  constructor(private store: Store<fromInstructor.State>, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {

    this.subscription.add(
      this.store.select('auth').pipe(mergeMap((mdata) => {
        if (mdata.user) {
          const uid = mdata.user.uid;
          return from(this.db.collection('battalions').doc(mdata.user.battalionCode).valueChanges()).pipe(map((rdata: any) => {
            return {battalionCode: mdata.user.battalionCode, instructor: rdata.instructors[uid]};
          }));
        } else {
          return EMPTY;
        }
      })).subscribe((data: any) => {
        if (data) {
          this.battalionCode = data.battalionCode;
          if (data.instructor.approved) {
            this.router.navigate(['/instructor']);
          }
        }
      })
    );



  }

  signout() {
    this.store.dispatch(new LogoutActions.Logout());
  }

}
