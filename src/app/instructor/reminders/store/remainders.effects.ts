import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom, finalize } from 'rxjs/operators';
import { EMPTY, of, from, forkJoin } from 'rxjs';


// ngrx actions
import { Store, select } from '@ngrx/store';
import * as remaindersActions from './remainders.actions';
import * as fromInstructor from '../../store/index';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable()
export class RemindersEffect {

  sendRemainder = createEffect(() => this.actions$.pipe(
    ofType(remaindersActions.sendRemainder),
    withLatestFrom(this.store.select('auth')),
    tap((data: any) => {

      // battalion code
      const battalionCode = data[1].user.battalionCode;

      // image url array
      const imageUrlArray = [];

      // remainder data
      const remainderData = data[0];

      remainderData.images.forEach(imageData => {
        try {
          const file = imageData.file;
          const imageName = Math.random() * 200 + '.' + file.name;
          const path = `remainders/${imageName}`;
          const ref = this.storage.ref(path);
          const image = this.storage.upload(path, file).then(() => {
            ref.getDownloadURL().toPromise().then((url) => {
              imageUrlArray.push(url);
            });
          });
        } catch (error) {
          console.log(error);
        }
      });

      console.log(imageUrlArray);
    })
  ), {dispatch: false});

  constructor(private actions$: Actions , private db: AngularFirestore, private storage: AngularFireStorage, private store: Store<fromInstructor.State>) {}
}
