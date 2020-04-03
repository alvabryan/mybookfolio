import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// portfolio actions
import * as PortfolioActions from './portfolio.actions';
import { tap, switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { EMPTY, of, from, forkJoin, empty } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { firestore } from 'firebase/app';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PortfolioProgressService } from './portfolio-progress.service';

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
    case 'Learning Style Inventory':
      dbPath = 'learningStyle';
      break;
    // non coursework files
    case 'Four Year Goals':
      dbPath = 'yearlyGoals';
      break;
    case 'Personal Ad':
      dbPath = 'personalAd';
      break;
    case 'Winning Colors':
      dbPath = 'winningColors';
      break;
    case 'Human Graph Activity':
      dbPath = 'humanGraphActivity';
      break;
    case 'Financial Planning Module 1':
      dbPath = 'financialPlanningModule1';
      break;
    case 'Financial Planning Module 2':
      dbPath = 'financialPlanningModule2';
      break;
    case 'Financial Planning Module 3':
      dbPath = 'financialPlanningModule3';
      break;
    case 'Financial Planning Module 4':
      dbPath = 'financialPlanningModule4';
      break;
    case 'Financial Planning Module 5':
      dbPath = 'financialPlanningModule5';
      break;
    case 'Financial Planning Module 6':
      dbPath = 'financialPlanningModule6';
      break;
    default:
      dbPath = null;
  }
  return dbPath;
};

const fileProgressCalculator = (fileContent: any, uploadType: string) => {
  const fileProgress = fileContent.content.length > 0 ? (fileContent.content.length * 50) : 0;
  const writtenContent = fileContent.writtenContent ? fileContent.writtenContent ? 50 : 0 : 0;

  if (uploadType === 'upload') {
    return (fileProgress + writtenContent) + 50;
  } else if (uploadType === 'delete') {
    return (fileProgress + writtenContent) - 50;
  } else {
    return fileProgress;
  }

};

const fileEditorProgressCalculator = (editorValue, fileContentData) => {
  if (editorValue) {
    return fileProgressCalculator(fileContentData, 'any') + 50;
  } else {
    return fileProgressCalculator(fileContentData, 'any');
  }
};

const goalsProgressCalculator = (goalsNewValue, goalsData, submitType) => {
  const goalsValueProgress = goalsNewValue ? 50 : 0;
  const postSecondaryGoals = goalsData ? goalsData.postSecondaryGoals ? goalsData.postSecondaryGoals.content ? 50 : 0 : 0 : 0;
  const fourYearGoals = goalsData ? goalsData.fourYearGoals ? goalsData.fourYearGoals.content ? 50 : 0 : 0 : 0;

  switch (submitType) {
    case 'fourYearGoals':
      return goalsValueProgress + postSecondaryGoals;
      break;
    case 'postSecondaryGoals':
      return goalsValueProgress + fourYearGoals;
      break;
    default:
      return 0;
  }
};

const winningColorsProgressCaluclator = (winningData) => {
  const secAProgress: number = +winningData.secA.one + +winningData.secA.two + +winningData.secA.three + +winningData.secA.four + +winningData.secA.five;
  const secBProgress: number = +winningData.secB.one + +winningData.secB.two + +winningData.secB.three + +winningData.secB.four + +winningData.secB.five;
  const secCProgress: number = +winningData.secC.one + +winningData.secC.two + +winningData.secC.three + +winningData.secC.four + +winningData.secC.five;
  const secDProgress: number = +winningData.secD.one + +winningData.secD.two + +winningData.secD.three + +winningData.secD.four + +winningData.secD.five;

  const totalProgress: number = +secAProgress + +secBProgress + +secCProgress + +secDProgress;

  if (totalProgress < 20) {
    return totalProgress < 10 ? 0 : 50;
  } else {
    return 100;
  }
};

const humanGraphProgressCalculator = (humanGraphData) => {
  const humanGraph = humanGraphData ? humanGraphData : null;
  const questionOne: number = humanGraph ? humanGraph.questionOne ? 16.6666666 : null : null;
  const questionTwo: number = humanGraph ? humanGraph.questionTwo ? 16.6666666 : null : null;
  const questionThree: number = humanGraph ? humanGraph.questionThree ? 16.6666666 : null : null;
  const questionFour: number = humanGraph ? humanGraph.questionFour ? 16.6666666 : null : null;
  const questionFive: number = humanGraph ? humanGraph.questionFive ? 16.66666666 : null : null;
  const questionSix: number = humanGraph ? humanGraph.questionSix ? 16.6666666 : null : null;

  return Math.floor(+questionOne + +questionTwo + +questionThree + +questionFour + +questionFive + +questionSix) + 1;
};


const financialPlanningModuleOneProgress = (checkData: any) => {
  let progress = 0;

  if (
    checkData.habitOne !== '' &&
    checkData.habitOneSymbol !== '' &&
    checkData.habitOneDesc !== '' &&
    checkData.habitTwo !== '' &&
    checkData.habitTwoSymbol !== '' &&
    checkData.habitTwoDesc !== '' &&
    checkData.habitThree !== '' &&
    checkData.habitThreeSymbol !== '' &&
    checkData.habitThreeDesc !== ''
    ) {
    progress += 25;
  }

  if (
    checkData.smartOne !== '' &&
    checkData.smartTwo !== '' &&
    checkData.smartThree !== '' &&
    checkData.smartFour !== '' &&
    checkData.smartFive !== '' &&
    checkData.smartSix !== ''
  ) {
    progress += 25;
  }

  if (
    checkData.differOne !== '' &&
    checkData.differTwo !== ''
  ) {
    progress += 25;
  }

  if (
    checkData.questionOne !== '' &&
    checkData.questionTwo !== '' &&
    checkData.questionThree !== '' &&
    checkData.questionFour !== ''
  ) {
    progress += 25;
  }

  return progress;
};

@Injectable()
export class PortfolioEffects {

    saveDataLocal = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.searchCadet),
        tap((data) => {
            localStorage.setItem('searchCadetData', JSON.stringify(data));
        })),
    {dispatch: false});

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

          const dbPath = pageNameSetter(data.pageName);
          if (dbPath) {
            return from(this.db.collection(`portfolio/${data.uid}/${dbPath}`).doc(`${data.uid}`).valueChanges()).pipe(map((returnData) => {
                return PortfolioActions.searchCadetData(returnData);
            }));
          }

          return EMPTY;
        })
    ));

    uploadFile = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.uploadFile),
      withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
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
        const uploadDate = firestore.Timestamp.now();
        const fileType = data[0].file.target.files[0].type.split('/');
        const fileName = Math.random() * 200 + '.' + fileType[1].toLowerCase();
        const imageName = `${Date.now()}_${fileName}`;
        const path = `${dbPath}/${imageName}`;

        // calculate the progress plus the new file
        const courseWorkProgress = fileProgressCalculator(data[1].viewData[cadetLetLevel], 'upload');

        // file type
        const fileTypeSplit = (splitFileName) => {
          const fileExtension = splitFileName.toLowerCase();
          if (fileExtension === 'docx' || fileExtension === 'doc' || fileExtension === 'pdf') {
            return 'doc';
          } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'svg') {
            return 'image';
          }
        };

        const fileTypeExtension = fileTypeSplit(fileType[1]);

        // reference to storage
        const ref = this.storage.ref(path);

        // upload image
        const image = this.storage.upload(path, data[0].file.target.files[0]);

        return forkJoin(
          from(image.snapshotChanges()).pipe(catchError(() => EMPTY)),
          from(image).pipe(catchError(() => EMPTY))
        ).pipe(switchMap(() => {

            // get download URL and upload progress data
            return from(ref.getDownloadURL()).pipe(tap((url: any) => {

              forkJoin(
                from(
                  this.db.collection(`portfolio/${cadetUid}/${dbPath}`).doc(`${cadetUid}`).set({
                    [`${cadetLetLevel}`]: { content: firestore.FieldValue.arrayUnion({
                      attachDescription: data[0].description,
                      attachName: data[0].fileName,
                      dateSubmitted: uploadDate,
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
                          [`${cadetLetLevel}`]: courseWorkProgress
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
        // battalion code
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

        // calculate the progress plus the new file
        const courseWorkProgress = fileProgressCalculator(data[1].viewData[cadetLetLevel], 'delete');

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
                  [cadetLetLevel]: courseWorkProgress
                }
              }
            }
          }, {merge: true});
          this.storage.storage.refFromURL(`${imageUrlToDelete}`).delete();
        }
      })
    ), {dispatch: false});

    fileEditorUpdate = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.fileUploadEditorUpdate),
      withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
      tap((data: any) => {
        // battalion code
        const battalionCode = data[2].user.battalionCode;

        // editor text
        const editorValue = data[0].editorText.editor;

        // database path
        const dbPath = pageNameSetter(data[1].pageName);

        // current cadet
        const cadetUid = data[1].cadetSearchData.uid;

        // current cadet let level
        const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

        // calculate the progress minus the new file
        const courseWorkProgress = fileEditorProgressCalculator(editorValue, data[1].viewData[cadetLetLevel]);

        forkJoin(
          from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
            [cadetLetLevel]: {
              writtenContent: {
                content: editorValue,
                dateSubmitted: firestore.FieldValue.serverTimestamp()
              }
            }
          }, {merge: true})),
          from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
            [cadetUid]: {
              progress: {
                [dbPath]: {
                  [cadetLetLevel]: courseWorkProgress
                }
              }
            }
          }, {merge: true}))
        );

      })
    ), {dispatch: false});


    // four year goals update
    yearlyGoalsUpdate = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.fourYearGoalsUpdate),
      withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
      tap((data: any) => {

        // goals data
        const goalsData = data[0].yearlyGoals.editor;

        // battalion code
        const battalionCode = data[2].user.battalionCode;

        // database path
        const dbPath = pageNameSetter(data[1].pageName);

        // current cadet
        const cadetUid = data[1].cadetSearchData.uid;

        // current cadet let level
        const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

        // calculate yearlyGoals progress
        const goalsProgress = goalsProgressCalculator(goalsData, data[1].viewData[cadetLetLevel], 'fourYearGoals');

        forkJoin(
          from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
            [cadetLetLevel]: {
              fourYearGoals: {
                content: goalsData
              },
              dateSubmitted: firestore.FieldValue.serverTimestamp()
            }
          }, {merge: true})),
          from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
            [cadetUid]: {
              progress: {
                [dbPath]: {
                  [cadetLetLevel]: goalsProgress
                }
              }
            }
          }, {merge: true}))
        );

      })
    ), {dispatch: false});

    // post secondary goals update
    postGoalsUpdate = createEffect(() => this.actions$.pipe(
      ofType(PortfolioActions.postSecondaryGoalsUpdate),
      withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
      tap((data: any) => {

        // goals data
        const goalsData = data[0].postSecondaryGoals.postGoals;

        // battalion code
        const battalionCode = data[2].user.battalionCode;

        // database path
        const dbPath = pageNameSetter(data[1].pageName);

        // current cadet
        const cadetUid = data[1].cadetSearchData.uid;

        // current cadet let level
        const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

        // calculate yearlyGoals progress
        const goalsProgress = goalsProgressCalculator(goalsData, data[1].viewData[cadetLetLevel], 'postSecondaryGoals');

        forkJoin(
          from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
            [cadetLetLevel]: {
              postSecondaryGoals: {
                content: goalsData
              },
              dateSubmitted: firestore.FieldValue.serverTimestamp()
            }
          }, {merge: true})),
          from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
            [cadetUid]: {
              progress: {
                [dbPath]: {
                  [cadetLetLevel]: goalsProgress
                }
              }
            }
          }, {merge: true}))
        );

      })
    ), {dispatch: false});


    // winning colors update
    winningColors = createEffect(() => this.actions$.pipe(
    ofType(PortfolioActions.winningColorsUpdate),
    withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
    tap((data: any) => {

      // goals data
      const winningData = data[0].winningColorsData;

      // battalion code
      const battalionCode = data[2].user.battalionCode;

      // database path
      const dbPath = pageNameSetter(data[1].pageName);

      // current cadet
      const cadetUid = data[1].cadetSearchData.uid;

      // current cadet let level
      const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

      // winning colors progress
      const winningColorsProgress = winningColorsProgressCaluclator(winningData);

      forkJoin(
        from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
          [cadetLetLevel]: {
            content: winningData,
            dateSubmitted: firestore.FieldValue.serverTimestamp()
          }
        }, {merge: true})),
        from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
          [cadetUid]: {
            progress: {
              [dbPath]: {
                [cadetLetLevel]: winningColorsProgress
              }
            }
          }
        }, {merge: true}))
      );

    })
  ), {dispatch: false});

  // learning style update
  learningStyle = createEffect(() => this.actions$.pipe(
    ofType(PortfolioActions.learningStyleUpdate),
    withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
    tap((data: any) => {

      // goals data
      const learningStyleData = data[0].learningStyleData;

      // battalion code
      const battalionCode = data[2].user.battalionCode;

      // database path
      const dbPath = pageNameSetter(data[1].pageName);

      // current cadet
      const cadetUid = data[1].cadetSearchData.uid;

      // current cadet let level
      const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

      // learning style progress

      forkJoin(
        from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
          [cadetLetLevel]: {
            content: learningStyleData,
            dateSubmitted: firestore.FieldValue.serverTimestamp()
          }
        }, {merge: true})),
        from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
          [cadetUid]: {
            progress: {
              [dbPath]: {
                [cadetLetLevel]: 100
              }
            }
          }
        }, {merge: true}))
      );

    })
  ), {dispatch: false});

  // personal Ad update
  personalAd = createEffect(() => this.actions$.pipe(
    ofType(PortfolioActions.personalAdUpdate),
    withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
    tap((data: any) => {

      // goals data
      const personalAd = data[0].personalAd;

      // battalion code
      const battalionCode = data[2].user.battalionCode;

      // database path
      const dbPath = pageNameSetter(data[1].pageName);

      // current cadet
      const cadetUid = data[1].cadetSearchData.uid;

      // current cadet let level
      const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

      // personal ad progress
      const personalAdProgress = personalAd ? 100 : 0;

      forkJoin(
        from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
          [cadetLetLevel]: {
            content: personalAd,
            dateSubmitted: firestore.FieldValue.serverTimestamp()
          }
        }, {merge: true})),
        from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
          [cadetUid]: {
            progress: {
              [dbPath]: {
                [cadetLetLevel]: personalAdProgress
              }
            }
          }
        }, {merge: true}))
      );

    })
  ), {dispatch: false});


  // human graph update
  humanGraph = createEffect(() => this.actions$.pipe(
    ofType(PortfolioActions.humanGraphUpdate),
    withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
    tap((data: any) => {

      // goals data
      const humanGraph = data[0].humanGraphData;

      // battalion code
      const battalionCode = data[2].user.battalionCode;

      // database path
      const dbPath = pageNameSetter(data[1].pageName);

      // current cadet
      const cadetUid = data[1].cadetSearchData.uid;

      // current cadet let level
      const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

      // human graph progress
      const humanGraphProgress = humanGraphProgressCalculator(humanGraph);

      forkJoin(
        from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
          [cadetLetLevel]: {
            content: humanGraph,
            dateSubmitted: firestore.FieldValue.serverTimestamp()
          }
        }, {merge: true})),
        from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
          [cadetUid]: {
            progress: {
              [dbPath]: {
                [cadetLetLevel]: humanGraphProgress
              }
            }
          }
        }, {merge: true}))
      );

    })
  ), {dispatch: false});

  // financial planning module 1 update

  financialPlanningModule = createEffect(() => this.actions$.pipe(
    ofType(PortfolioActions.FinancialPlanningModuleUpdate),
    withLatestFrom(this.store.select('portfolio'), this.store.select('auth')),
    tap((data: any) => {
      // goals data
      const moduleOne = data[0].moduleData;

      // battalion code
      const battalionCode = data[2].user.battalionCode;

      // database path
      const dbPath = pageNameSetter(data[1].pageName);

      // current cadet
      const cadetUid = data[1].cadetSearchData.uid;

      // current cadet let level
      const cadetLetLevel = 'let' + data[1].cadetSearchData.letLevel;

      // human graph progress
      const progress = this.getProgress.getFinancialPlanningProgress(moduleOne, data[1].pageName);

      forkJoin(
        from(this.db.doc(`portfolio/${cadetUid}/${dbPath}/${cadetUid}`).set({
          [cadetLetLevel]: {
            content: moduleOne,
            dateSubmitted: firestore.FieldValue.serverTimestamp()
          }
        }, {merge: true})),
        from(this.db.doc(`battalions/${battalionCode}/cadetsProgress/${battalionCode}`).set({
          [cadetUid]: {
            progress: {
              [dbPath]: {
                [cadetLetLevel]: progress
              }
            }
          }
        }, {merge: true}))
      );

    })
  ), {dispatch: false});



    constructor(private actions$: Actions, private store: Store<fromPortfolio.State>, private db: AngularFirestore, private storage: AngularFireStorage, private getProgress: PortfolioProgressService) {}
}
