import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// portfolio actions
import * as PortfolioActions from './portfolio.actions';
import { tap, switchMap, withLatestFrom, map } from 'rxjs/operators';
import { EMPTY, of, from, forkJoin } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { firestore } from 'firebase/app';

const pageNameSetter = (pageName) => {
  let dbPath = null;
  switch (pageName) {
    case 'Success Profiler and Personal Growth Plan':
      dbPath = 'successProfiler';
      break;
    case 'Resume':
      dbPath = 'resume';
      break;
    case 'Course Work':
      dbPath = 'courseWork';
      break;
    case 'Essay':
      dbPath = 'essay';
      break;
    case 'Achievements':
      dbPath = 'achievements';
      break;
    case 'Service Learning':
      dbPath = 'serviceLearning';
      break;
    case 'Let 1-4 Lesson Evidence':
      dbPath = 'lessonEvidence';
      break;
    case 'Written Summary':
      dbPath = 'writtenSummary';
      break;
    case 'Cadet Challenge':
      dbPath = 'cadetChallenge';
      break;
    case 'Service Learning':
      dbPath = 'serviceLearning';
      break;
    case 'Achievements':
      dbPath = 'achievements';
      break;
    default:
      dbPath = null;
  }
  return dbPath;
};

@Injectable()
export class PortfolioEffects {

    saveDataLocal = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.searchCadet),
        tap((data) => {
            localStorage.setItem('searchCadetData', JSON.stringify(data));
        })
    ), {dispatch: false});

    loadSearchData = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.searchCadetLoad),
        () => {
            const searchData = JSON.parse(localStorage.getItem('searchCadetData'));
            if (searchData) {
                return of(PortfolioActions.searchCadet(searchData));
            } else {
                return EMPTY;
            }
        }
    ));

    setPageName = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.setPortfolioPageType),
      tap((data) => {
        if (data.pageName) {
          localStorage.removeItem('taskName');
          const taskNameData = JSON.stringify(data.pageName);
          localStorage.setItem('taskName', taskNameData);
        }
      })
    ), {dispatch: false});

    onReload = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.onReload),
      map(() => {
        const localPageName = JSON.parse(localStorage.getItem('taskName'));
        return PortfolioActions.setPortfolioPageType({pageName: localPageName});
      })
    ));

    getCadetPortfolioData = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.setPortfolioPageType),
        withLatestFrom(this.store.select('portfolio')),
        map((data: any) => {
            return {
                pageName: data[0].pageName,
                uid: data[1].cadetSearchData ? data[1].cadetSearchData.uid : null
            };
        }),
        switchMap((data: any) => {

            if (data.pageName === 'Four Year Goals') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/yearlyGoals`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data);
                }));
            }

            if (data.pageName === 'Learning Style Inventory') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/learningStyle`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data);
                }));
            }


            if (data.pageName === 'Success Profiler and Personal Growth Plan') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/successProfiler`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data);
                }));
            }

            if (data.pageName === 'Course Work') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/courseWork`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data);
                }));
            }

            if (data.pageName === 'Resume') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/resume`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data);
                }));
            }

            if (data.pageName === 'Personal Ad') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/personalAd`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data);
                }));
            }

            if (data.pageName === 'Course Work') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/courseWork`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                return PortfolioActions.searchCadetData(data);
              }));
            }

            if (data.pageName === 'Essay') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/essay`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                return PortfolioActions.searchCadetData(data);
              }));
            }

            if (data.pageName === 'Let 1-4 Lesson Evidence') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/lessonEvidence`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                return PortfolioActions.searchCadetData(data);
              }));
            }

            if (data.pageName === 'Written Summary') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/writtenSummary`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                return PortfolioActions.searchCadetData(data);
              }));
            }

            if (data.pageName === 'Cadet Challenge') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/cadetChallenge`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                return PortfolioActions.searchCadetData(data);
              }));
            }

            if (data.pageName === 'Service Learning') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/serviceLearning`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                return PortfolioActions.searchCadetData(data);
              }));
            }

            if (data.pageName === 'Winning Colors') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/winningColors`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                    return PortfolioActions.searchCadetData(data);
                }));
            }

            if (data.pageName === 'Achievements') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/achievements`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                  return PortfolioActions.searchCadetData(data);
              }));
            }

            if (data.pageName === 'Human Graph Activity') {
              // tslint:disable-next-line: no-shadowed-variable
              return from(this.db.collection(`portfolio/${data.uid}/humanGraphActivity`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
                  return PortfolioActions.searchCadetData(data);
              }));
            }

            return EMPTY;
        })
    ));

    uploadFile = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.uploadFile),
      withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
      tap((data) => console.log(data)),
      switchMap((data: any) => {

        // battalion code
        const battalionCode = data[2].user.battalionCode;

        // upload page name
        const pageName = data[1].pageName;

        // database path
        const dbPath = pageNameSetter(pageName);

        // current cadet data
        const cadetUid = data[1].cadetSearchData.uid;

        // current cadet let level
        const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

        // file data
        const uploadDate = Date.now();
        const fileName = data[0].file.target.files[0].name;
        const imageName = `${Date.now()}_${fileName}`;
        const path = `${pageName}/${imageName}`;

        // file type
        const fileTypeSplit = (uploadFileType) => {
          const splitFileName = fileName.split('.');
          const fileExtension = splitFileName[1].toLowerCase();
          if (fileExtension === 'docx' || fileExtension === 'doc' || fileExtension === 'pdf') {
            return 'doc';
          } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'svg') {
            return 'image';
          }
        };

        const fileTypeExtension = fileTypeSplit(fileName);

        // reference to storage
        const ref = this.storage.ref(path);

        // upload image
        const image = this.storage.upload(path, data[0].file.target.files[0]);

        return forkJoin(
          from(image.snapshotChanges()),
          from(image)
        ).pipe(switchMap(() => {

            // get download URL and upload progress data
            return from(ref.getDownloadURL()).pipe(tap((url: any) => {

              forkJoin(
                from(
                  this.db.collection(`portfolio/${cadetUid}/${dbPath}`).doc(`${cadetUid}`).set({
                    [`${cadetLetLevel}`]: { content: firestore.FieldValue.arrayUnion({
                      attachDescription: data[0].description,
                      attachName: data[0].fileName,
                      dataSubmitted: uploadDate,
                      downloadUrl: url,
                      fileName: imageName,
                      fileType: fileTypeExtension
                    })}
                  }, {merge: true})
                ),
                from(
                  this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
                    [`${cadetUid}`]: {
                      progress: {
                        [`${dbPath}`]: {
                          [`${cadetLetLevel}`]: firestore.FieldValue.increment(50)
                        }
                      }
                    }
                  }, {merge: true})
                )
              );


            }), map(() => {
              return PortfolioActions.uploadingFile();
            }));

          }));
      })
    ));

    deleteFile = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.deleteFile),
      withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
      tap((data: any) => {
        // battalion coe
        const battalionCode = data[2].user.battalionCode;

        // current cadet
        const cadetUid = data[1].cadetSearchData.uid;

        // current cadet let level
        const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

        // upload page name
        const pageName = data[0].pageName;

        // file data
        const filesData = data[0].filesData;
        const deleteFileIndex = data[0].fileIndex;
        const imageUrlToDelete = filesData[deleteFileIndex].downloadUrl;

        // coursework database path
        const dbPath = pageNameSetter(pageName);

        const newFilesData = filesData.filter((obj, index) => {
          if (index !== deleteFileIndex) {
            return obj;
          }
        });

        if (dbPath) {
          this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({[cadetLetLevel]: {content: newFilesData}}, {merge: true});
          this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
            [cadetUid]: {
              progress: {
                [dbPath]: {
                  [cadetLetLevel]: firestore.FieldValue.increment(-50)
                }
              }
            }
          }, {merge: true});
          this.storage.storage.refFromURL(`${imageUrlToDelete}`).delete();
        }
      })
    ), {dispatch: false});

    constructor(private actions$: Actions, private store: Store<fromPortfolio.State>, private db: AngularFirestore, private storage: AngularFireStorage) {}
}
