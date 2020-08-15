import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import * as fromCadet from '../../store/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as cadetCustomCardActions from './custom-cards.actions';
import { tap, withLatestFrom, switchMap, map, mergeMap } from 'rxjs/operators';
import { from, EMPTY } from 'rxjs';
import { firestore } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class CustomCardEffects {

  getAssignments = createEffect(() => this.actions$.pipe(
    ofType(cadetCustomCardActions.getAssignments),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;

      return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').valueChanges({idField: 'id'})).pipe(map((returnedAssignments) => {
        return cadetCustomCardActions.setAssignments({assignments: returnedAssignments});
      }));
    })
  ));

  submitAssignment = createEffect(() => this.actions$.pipe(
    ofType(cadetCustomCardActions.submitAssignment),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;
      const uid = data[1].user.uid;

      const submissionData = data[0].submission;

      const uploadDate = firestore.Timestamp.now();
      const fileType = data[0].submission.file.target.files[0].type.split('/');
      const fileName = Math.random() * 200 + '.' + fileType[1].toLowerCase();
      const imageName = `${Date.now()}_${fileName}`;
      const path = `customCards/${battalionCode}/submission/${imageName}`;

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
      const image = this.storage.upload(path, data[0].submission.file.target.files[0]);

      return from(image).pipe(switchMap(() => {
        // get download URL and upload progress data
        return from(ref.getDownloadURL()).pipe(mergeMap((url: any) => {

          try {
            return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').doc(submissionData.assignmentId).collection('submissions').doc(uid).set({
              attachmentUrl: url,
              dateSubmitted: uploadDate,
              // tslint:disable-next-line: object-literal-shorthand
              fileName: fileName,
              fileType: fileTypeExtension,
              studentComment: submissionData.comment,
              studentid: uid
            })).pipe(map(() => {
              return cadetCustomCardActions.setLoadingStatus();
            }));
          } catch (err) {
            this.storage.storage.refFromURL(`${url}`).delete();
            console.log(err);
            // return of(PortfolioActions.fileUploadError({ error: err }));
          }

        }));

      }));
    })
  ));

  getCadetSubmission = createEffect(() => this.actions$.pipe(
    ofType(cadetCustomCardActions.getCadetSubmission),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;
      const uid = data[1].user.uid;
      const assignmentId = data[0].assignmentId;

      try {
        return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').doc(assignmentId).collection('submissions').doc(uid).valueChanges()).pipe(tap((rData) => rData), map((returnedData) => {
          return cadetCustomCardActions.setCadetSubmission({submission: returnedData});
        }));
      } catch (err) {
        console.log(err);
      }

    })
  ));

  deleteSubmission = createEffect(() => this.actions$.pipe(
    ofType(cadetCustomCardActions.deleteSubmission),
    withLatestFrom(this.store.select('auth')),
    tap((data) => {

      const battalionCode = data[1].user.battalionCode;
      const uid = data[1].user.uid;
      const assignmentId = data[0].currentAssignmentId;
      const downloadUrl = data[0].fileDownloadUrl;
      try {
        this.db.collection('battalions').doc(battalionCode).collection('customCards').doc(assignmentId).collection('submissions').doc(uid).delete();
        this.storage.storage.refFromURL(downloadUrl).delete();
      } catch (err) {
        console.log(err);
      }
    })
  ), {dispatch: false});


  constructor(private store: Store<fromCadet.State>, private db: AngularFirestore, private actions$: Actions, private storage: AngularFireStorage) {}
}
