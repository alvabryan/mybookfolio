import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom, finalize, mergeMap } from 'rxjs/operators';
import { EMPTY, of, from, forkJoin } from 'rxjs';
import { firestore } from 'firebase/app';

// ngrx actions
import { Store, select } from '@ngrx/store';
import * as remindersAction from './remainders.actions';
import * as fromInstructor from '../../store/index';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable()
export class RemindersEffect {

  sendRemainder = createEffect(() => this.actions$.pipe(
    ofType(remindersAction.sendRemainder),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {

      // battalion code
      const battalionCode = data[1].user.battalionCode;

      // remainder data
      const remainderData = data[0];

      // upload timestamp
      const uploadDate = firestore.Timestamp.now();


      if (remainderData.images[0]) {
        const uploadImage = remainderData.images[0].file;
        const fileType = uploadImage.type.split('/');
        const fileName = Math.random() * 200 + '.' + fileType[1].toLowerCase();
        const imageName = `${Date.now()}_${fileName}`;
        const path = `reminders/${imageName}`;

      // file type
        const fileTypeSplit = (splitFileName) => {
        const fileExtension = splitFileName.toLowerCase();

        if (fileExtension === 'docx' || fileExtension === 'doc' || fileExtension === 'pdf' || fileExtension === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
          return 'doc';
        } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'svg') {
          return 'image';
        }
      };

        const fileTypeExtension = fileTypeSplit(fileType[1]);

      // reference to storage
        const ref = this.storage.ref(path);
        const image = this.storage.upload(path, uploadImage);

        return from(image).pipe(switchMap(() => {
        return from(ref.getDownloadURL()).pipe(mergeMap((url: any) => {
          try {
            return from(this.db.collection('battalions').doc(battalionCode).collection('reminders').add({
              dateSent: uploadDate,
              message: remainderData.message,
              showPeriods: remainderData.period,
              showLet: remainderData.let,
              urlLink: remainderData.url,
              imageUrl: url
            })).pipe(map(() => {
              return remindersAction.uploadingFile();
            }));
          } catch (error) {
            this.storage.storage.refFromURL(`${url}`).delete();
            console.log(error);
          }
        }));
      }));
      } else {
        return from(this.db.collection('battalions').doc(battalionCode).collection('reminders').add({
          dateSent: uploadDate,
          message: remainderData.message,
          showLet: remainderData.let,
          showPeriods: remainderData.period,
          urlLink: remainderData.url,
          imageUrl: ''
        })).pipe(map(() => {
          return remindersAction.uploadingFile();
        }));
      }
    })
  ));


  getReminders = createEffect(() => this.actions$.pipe(
    ofType(remindersAction.getReminders),
    withLatestFrom(this.store.select('auth')),
    switchMap((data: any) => {
      // battalion code
      const battalionCode = data[1].user.battalionCode;

      return from(this.db.collection('battalions').doc(battalionCode).collection('reminders').valueChanges({ idField: 'id'})).pipe(tap((rdata) => console.log(rdata)), map((dataa: any) => {
        return remindersAction.setReminders({reminders: dataa});
      }));

    })
  ));

  deleteReminder = createEffect(() => this.actions$.pipe(
    ofType(remindersAction.deleteReminder),
    withLatestFrom(this.store.select('auth')),
    tap((data: any) => {

      // battalion code
      const battalionCode = data[1].user.battalionCode;

      // reminder uid
      const uid = data[0].reminderUid;

      from(this.db.collection('battalions').doc(battalionCode).collection('reminders').doc(uid).delete()).pipe(tap(rdata => console.log(rdata)));
    })
  ), {dispatch: false});

  constructor(private actions$: Actions , private db: AngularFirestore, private storage: AngularFireStorage, private store: Store<fromInstructor.State>) {}
}
