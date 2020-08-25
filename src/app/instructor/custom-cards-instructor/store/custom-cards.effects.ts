import { Injectable } from '@angular/core';

import * as fromRoot from '../../../store';
import * as fromInstructor from '../../store/index';
import { Store, createAction } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import * as customCardActions from './custom-cards.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap, withLatestFrom, map, mergeMap } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';

import { firestore } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class CustomCardEffects {

  getAssignments = createEffect(() => this.actions$.pipe(
    ofType(customCardActions.getAssignments),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;

      return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').valueChanges({idField: 'id'})).pipe(map((assignmentsData) => {
        return customCardActions.setAssignments({assignments: assignmentsData});
      }));
    })
  ));

  createAssignment = createEffect(() => this.actions$.pipe(
    ofType(customCardActions.createAssignment),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;

      // assignment data
      const assignmentData = data[0].newAssignment;


      if (data[0].newAssignment.fileData) {
        // file data
        const uploadDate = firestore.Timestamp.now();
        const fileType = data[0].newAssignment.fileData.target.files[0].type.split('/');
        const fileName = Math.random() * 200 + '.' + fileType[1].toLowerCase();
        const imageName = `${Date.now()}_${fileName}`;
        const path = `customCards/${battalionCode}/assignments/${imageName}`;

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

        return from(image).pipe(switchMap(() => {
          // get download URL and upload progress data
          return from(ref.getDownloadURL()).pipe(mergeMap((attachmentUrl: any) => {

            try {
              return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').add({
                attachment: {
                  fileType: fileTypeExtension,
                  url: attachmentUrl
                },
                description: assignmentData.instructions,
                iconName: 'Folder',
                name: assignmentData.assignmentName,
                showCard: assignmentData.showAssignment,
                urlLink: assignmentData.link
              })).pipe(map(() => {
                return customCardActions.uploadingStatus();
              }));
            } catch (err) {
              this.storage.storage.refFromURL(`${attachmentUrl}`).delete();
              console.log(err);
              // return of(PortfolioActions.fileUploadError({ error: err }));
            }

          }));

        }));
      } else {
        return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').add({
          attachment: {},
          description: assignmentData.instructions,
          iconName: 'Folder',
          name: assignmentData.assignmentName,
          showCard: assignmentData.showAssignment,
          urlLink: assignmentData.link
        })).pipe(map(() => {
          return customCardActions.uploadingStatus();
        }));
      }

    })
  ));

  editAssignment = createEffect(() => this.actions$.pipe(
    ofType(customCardActions.editAssignment),
    withLatestFrom(this.store.select('auth')),
    tap((data) => {
      console.log(data);
    }),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;
      const editAssignmentId = data[0].editAssignment.assignmentId;
      const editAssignmentData = data[0].editAssignment;

      if (data[0].editAssignment.fileData.oldFileData && data[0].editAssignment.fileData.oldFileData) {
        // old image deleted and new one inserted (delete old image url and insert new image)
        return EMPTY;
      } else if (data[0].editAssignment.fileData.oldFileData && !data[0].editAssignment.fileData.oldFileData) {
        // old image deleted but no new one inserted (delete old image)
        return EMPTY;
      } else if (!data[0].editAssignment.fileData.oldFileData && !data[0].editAssignment.fileData.oldFileData) {
        // nothing was done to the filedata (keep it the same)
        return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').doc(editAssignmentId).set({
          description: editAssignmentData.instructions,
          iconName: 'Folder',
          name: editAssignmentData.assignmentName,
          showCard: editAssignmentData.showAssignment,
          urlLink: editAssignmentData.link
        }, {merge: true})).pipe(map(() => {
          return customCardActions.uploadingStatus();
        }));
      }

      // return EMPTY;
    })
  ));

  getCadetSubmissions = createEffect(() => this.actions$.pipe(
    ofType(customCardActions.getCurrentAssignmentSubmissions),
    withLatestFrom(this.store.select('auth')),
    switchMap((data) => {
      const battalionCode = data[1].user.battalionCode;
      const currentAssignmentId = data[0].assignmentId;

      return from(this.db.collection('battalions').doc(battalionCode).collection('customCards').doc(currentAssignmentId).collection('submissions').valueChanges({idField: 'id'})).pipe(map((rdata) => {
        return customCardActions.setCurrentAssignmentSubmissions({data: rdata});
      }));
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromInstructor.State>,
    private db: AngularFirestore,
    private storage: AngularFireStorage
    ) {}
}
