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

    deleteFile = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.deleteFile),
      withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
      tap((data: any) => {
        const battalionCode = data[2].user.battalionCode;
        const cadetUid = data[1].cadetSearchData.uid;
        const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;
        const pageName = data[0].pageName;
        const filesData = data[0].filesData;
        const deleteFileIndex = data[0].fileIndex;
        const imageUrlToDelete = filesData[deleteFileIndex].downloadUrl;
        const progressDecrement = -50;
        let dbPath = null;

        const newFilesData = filesData.filter((obj, index) => {
          if (index !== deleteFileIndex) {
            return obj;
          }
        });

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
          default:
            dbPath = null;
        }

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
                uid: data[1].cadetSearchData.uid
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
                return of(PortfolioActions.searchCadetData(null));
            }

            if (data.pageName === 'Essay') {
                return of(PortfolioActions.searchCadetData(null));
            }

            if (data.pageName === 'Let 1-4 Lesson Evidence') {
                return of(PortfolioActions.searchCadetData(null));
            }

            if (data.pageName === 'Written Summary') {
                return of(PortfolioActions.searchCadetData(null));
            }

            if (data.pageName === 'Achievements') {
                return of(PortfolioActions.searchCadetData(null));
            }

            if (data.pageName === 'Service Learning') {
                return of(PortfolioActions.searchCadetData(null));
            }

            if (data.pageName === 'Winning Colors') {
                // tslint:disable-next-line: no-shadowed-variable
                return from(this.db.collection(`portfolio/${data.uid}/winningColors`).doc(`${data.uid}`).valueChanges()).pipe(map((data) => {
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
      switchMap((data: any) => {

        const pathFolder = 'successProfiler';
        const uploadDate = Date.now();
        const imageName = `${Date.now()}_${data.file.target.files[0].name}`;
        const path = `${pathFolder}/${imageName}`;

        const ref = this.storage.ref(path);

        const image = this.storage.upload(path, data.file.target.files[0]);

        return forkJoin(
          from(image.snapshotChanges()),
          from(image)
        ).pipe(switchMap(() => {
            return from(ref.getDownloadURL()).pipe(tap((url: any) => {
              this.db.collection('portfolio/oCoeGDow4TUspZWRoBzfTQJ7otz1/successProfiler').doc(`oCoeGDow4TUspZWRoBzfTQJ7otz1`).update({
                ['let3.content']: firestore.FieldValue.arrayUnion({
                  attachDescription: data.description,
                  attachName: data.fileName,
                  dataSubmitted: uploadDate,
                  downloadUrl: url,
                  fileName: imageName,
                  fileType: 'image'
                })
            });
            }), map(() => {
              return PortfolioActions.uploadingFile();
            }));

          }));

      })
    ));

    constructor(private actions$: Actions, private store: Store<fromPortfolio.State>, private db: AngularFirestore, private storage: AngularFireStorage) {}
}
