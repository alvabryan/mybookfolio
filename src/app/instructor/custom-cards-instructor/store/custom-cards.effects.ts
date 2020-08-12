import { Injectable } from '@angular/core';

import * as fromRoot from '../../../store';
import * as fromInstructor from '../../store/index';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import * as customCardActions from './custom-cards.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap, withLatestFrom, map } from 'rxjs/operators';
import { EMPTY, from } from 'rxjs';

import { firestore } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

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

  createAssignment = createEffect(() => this.actions$.pipe(
    ofType(customCardActions.createAssignment),
    withLatestFrom(this.store.select('auth')),
    tap((data) => {
      console.log(data);
    }),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;

      // file data
      const uploadDate = firestore.Timestamp.now();
      const fileType = data[0].newAssignment.fileData.target.files[0].type.split('/');
      const fileName = Math.random() * 200 + '.' + fileType[1].toLowerCase();
      const imageName = `${Date.now()}_${fileName}`;
      const path = `customCards/${battalionCode}`;

      // file type
      const fileTypeSplit = (splitFileName) => {
        const fileExtension = splitFileName.toLowerCase();
        console.log(fileExtension);
        if (fileExtension === 'docx' || fileExtension === 'doc' || fileExtension === 'pdf' || fileExtension === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
          return 'doc';
        } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'svg') {
          return 'image';
        }
      };

      const fileTypeExtension = fileTypeSplit(fileType[1]);


      const ref = this.storage.ref(path);
      const image = this.storage.upload(path, data[0].newAssignment.fileData.target.files[0]);

      return EMPTY;
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private store: Store<fromInstructor.State>,
    private db: AngularFirestore,
    private storage: AngularFireStorage
    ) {}
}
