import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { User } from '../user.model';

import { switchMap, mergeMap, catchError, tap, map, take, withLatestFrom } from 'rxjs/operators';

// auth action
import * as AuthActions from './auth.actions';
import { of, EMPTY, from, forkJoin, combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';

import { firestore } from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/storage';

interface InstructorLetAssign {
    let1: boolean;
    let2: boolean;
    let3: boolean;
    let4: boolean;
}

const handleAuthentication = (userType: string, displayName: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoUrl: string, providerId: string, battalionCode: string, uid: string, letAssign: InstructorLetAssign, approvedStatus: boolean) => {
    const user = new User(userType, displayName, firstName, lastName, email, phoneNumber, photoUrl, providerId, battalionCode, uid, letAssign);
    localStorage.setItem('userData', JSON.stringify(user));

    return AuthActions.authenticationSuccess({
        // tslint:disable-next-line: object-literal-shorthand
        userType: userType,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoUrl,
        providerId: user.providerId,
        // tslint:disable-next-line: object-literal-shorthand
        battalionCode: battalionCode,
        uid: user.uid,
        letAssigned: letAssign,
        approved: approvedStatus
    });
};

const handleError = (errorCode: any, message: any) => {
    let errorMessage = 'An unknown error occurred!';

    switch (errorCode) {
    case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
    case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
    case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    case 'auth/wrong-password':
        errorMessage = 'This password is invalid or the user does not exist';
        break;
    case 'auth/too-many-requests':
        errorMessage = 'Too many unsuccessful login attempts. Please try again later';
        break;
    default:
        errorMessage = message;
    }

    // of creates a new observable
    return of(AuthActions.authenticateFail({error: errorMessage}));
};


@Injectable()
export class AuthEffects {

    // clear auth error
    clearError = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authenticateFail),
        map(() => {
            return AuthActions.clearError();
        })
    ));

    // login effect
    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginStart),
        switchMap((action) => {
            return from(this.afAuth.auth.signInWithEmailAndPassword(action.email, action.password)).pipe(switchMap((data: any) => {
              return this.db.doc(`users/${data.user.uid}`).valueChanges().pipe(tap((toFirebaseData: any) => {
                const userUserType = toFirebaseData.userType;
                firebase.analytics().logEvent('login', {userType: userUserType});
              }), map((userDataType: any) => {
                const userStatus = userDataType.userType === 'instructor' ? userDataType.data.approved : true;
                return handleAuthentication(userDataType.userType, data.user.displayName, userDataType.data.firstName, userDataType.data.lastName, data.user.email, data.user.phoneNumber, data.user.photoURL, data.user.providerId, userDataType.data.battalionCode, data.user.uid, userDataType.data.letLevel, userStatus);
              }));
            }), catchError(err => {console.log(err); return handleError(err.code, err.message); }));
        })
    )) ;

    // refresh page auto login
    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.refreshWindow), () => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
            return of(AuthActions.authenticationSuccess({
                userType: userData.userType,
                displayName: userData.displayName,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                photoUrl: userData.photoUrl,
                providerId: userData.providerId,
                battalionCode: userData.battalionCode,
                uid: userData.uid,
                letAssigned: userData.letAssigned,
                approved: userData.approved
            }));
        } else {
            return EMPTY;
        }

    });

    // redirect user based on type
    authRedirect = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authenticationSuccess),
        tap((data) => {
           if (data.userType === 'cadet') {
             if (this.router.url === '/cadet/settings') {
              this.router.navigate(['/cadet/settings']);
             } else {
              this.router.navigate(['/cadet']);
             }
           } else if (data.userType === 'instructor') {
            if (this.router.url === '/instructor/settings') {
              this.router.navigate(['/instructor/settings']);
             } else {
               if (data.approved === true) {
                this.router.navigate(['/instructor']);
               } else {
                this.router.navigate(['/instructor/approvel']);
               }
             }
           }
        })
    ), {dispatch: false});

    // battalion register
    battalionRegisterStart = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.battalionRegisterStart),
            switchMap((data: any) => {
                return this.db.doc(`battalionCodeTracker/battalionCode`).valueChanges().pipe(take(1), map((callBackData: any) => {
                    const isTaken = callBackData.codes.includes(data.battalionCode);
                    if (data.registrationType === 'battalion') {
                      if (!isTaken) {
                        return AuthActions.battalionRegister({...data});
                      } else {
                        return AuthActions.authenticateFail({error: 'System Error - Battalion Code already taken'});
                      }
                    } else {
                      if (isTaken) {
                        return AuthActions.battalionRegister({...data});
                      } else {
                        return AuthActions.authenticateFail({error: 'Battalion Code not found'});
                      }
                    }
                }));
            })
        )
    );

    instructorSignup = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.battalionRegister),
      switchMap((data: any) => {
        return from(this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)).pipe(
            tap((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: data.firstName + ' ' + data.lastName,
                    photoURL: null
                });
            }),
            map((userCredential) => {
                if (data.registrationType === 'battalion') {
                  return AuthActions.battalionRegisterSuccess({...data, ...userCredential});
                } else {
                  return AuthActions.battalionInstructorRegisterSuccess({...data, ...userCredential});
                }
            }),
            tap(() => {
              firebase.analytics().logEvent('sign_up', {userType: 'instructor'});
            }),
            catchError((err) => {
                return handleError(err.code, err.message);
            })
        );
      })
    ));

    battalionRegisterSuccess = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.battalionRegisterSuccess),
      switchMap((data: any) => {
        return forkJoin(
          from(this.db.collection('battalionCodeTracker').doc('battalionCode').set({
            codes: firestore.FieldValue.arrayUnion(data.battalionCode)
          }, {merge: true})),
          from(
            this.db.doc(`users/${data.user.uid}`).set({
                userType: 'instructor',
                data: {
                  battalionCode: data.battalionCode,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  letLevel: [1, 2, 3, 4],
                  phoneNumber: data.phoneNumber
                }
              })
          ),
          from(
            this.db.doc(`battalions/${data.battalionCode}`).set({
              battalionCode: data.battalionCode,
              city: data.city,
              instructors: {
                [data.user.uid]: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  letLevel: [1, 2, 3, 4],
                  position: data.instructorType,
                  phoneNumber: data.phoneNumber,
                  approved: true
                }
              },
              schoolName: data.schoolName,
              state: data.state,
              zipCode: data.zipCode
            })
          ),
          from(
            this.db.doc(`battalions/${data.battalionCode}`).collection('cadetDataSheet').doc(data.battalionCode).set({})
          ),
          from(
            this.db.doc(`battalions/${data.battalionCode}`).collection('cadetsProgress').doc(data.battalionCode).set({})
          )
        ).pipe(map(() => {
          return AuthActions.loginStart({email: data.email, password: data.password});
        }), tap(() => {
          firebase.analytics().logEvent('sign_up', {userType: 'battalion_registration'});
        }));
      })
    ));

    battalionInstructorRegisterSuccess = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.battalionInstructorRegisterSuccess),
      switchMap((data: any) => {
       return forkJoin(
        from(
          this.db.doc(`users/${data.user.uid}`).set({
              userType: 'instructor',
              data: {
                battalionCode: data.battalionCode,
                firstName: data.firstName,
                lastName: data.lastName,
                letLevel: [1, 2, 3, 4],
                position: data.instructorType,
                phoneNumber: data.phoneNumber,
                approved: false
              }
            })
        ),
        from(
          this.db.doc(`battalions/${data.battalionCode}`).set({
            instructors: {
              [data.user.uid]: {
                firstName: data.firstName,
                lastName: data.lastName,
                letLevel: [1, 2, 3, 4],
                position: data.instructorType,
                phoneNumber: data.phoneNumber
              }
            }
          }, {merge: true})
        )).pipe(map(() => {
          return AuthActions.loginStart({email: data.email, password: data.password});
        }), tap(() => {
          firebase.analytics().logEvent('sign_up', {userType: 'instructor'});
        }));
      })
    ));

    // cadet signup
    cadetSignupStart = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.cadetSignupStart),
            switchMap((data: any) => {
                return this.db.doc(`battalionCodeTracker/battalionCode`).valueChanges().pipe(take(1), map((callBackData: any) => {
                    if (callBackData.codes.includes(data.battalionCode)) {
                        return AuthActions.cadetRegister({...data});
                    } else {
                        return AuthActions.authenticateFail({error: 'Battalion Code not found'});
                    }
                }));
            })
        )
    );


    cadetSignup = createEffect(() => this.actions$.pipe(
            ofType(AuthActions.cadetRegister),
            switchMap((data: any) => {
                return from(this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)).pipe(
                    tap((userCredential) => {
                        userCredential.user.updateProfile({
                            displayName: data.firstName + ' ' + data.lastName,
                            photoURL: null
                        });
                    }),
                    map((userCredential) => {
                        console.log(userCredential);
                        return AuthActions.cadetSignupSuccess({...data, ...userCredential});
                    }),
                    catchError((err) => {
                        return handleError(err.code, err.message);
                    })
                );
            })
        )
    );

    cadetSignupSuccess = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.cadetSignupSuccess),
        switchMap((data: any) => {
            const appUserData = {
                firstName: data.firstName,
                lastName: data.lastName,
                letLevel: data.letLevel,
                period: data.classPeriod,
                uid: data.user.uid,
                progress: {}
              };

            return forkJoin(
                from(
                    this.db.doc(`users/${data.user.uid}`).set({
                        userType: 'cadet',
                        data: {
                          battalionCode: data.battalionCode,
                          firstName: data.firstName,
                          lastName: data.lastName,
                          letLevel: data.letLevel,
                          period: data.classPeriod
                        }
                      })
                ),
                from(this.db.doc(`battalions/${data.battalionCode}/cadetDataSheet/${data.battalionCode}`).set({
                    [data.user.uid] : {
                      firstName: data.firstName,
                      lastName: data.lastName,
                      letLevel: data.letLevel,
                      period: data.classPeriod,
                    }
                  }, { merge: true})
                ),
                from(
                    this.db.doc(`battalions/${data.battalionCode}/cadetsProgress/${data.battalionCode}`).set({ [data.user.uid] : { ...appUserData } }, {merge: true})
                )
            ).pipe(map(() => {
                return AuthActions.loginStart({email: data.email, password: data.password});
            }));
        }),
        tap((data: any) => {
            console.log(data);
            firebase.analytics().logEvent('sign_up', {userType: 'cadet'});
        })
    ));

    // Image Upload
    uploadProfileImage = createEffect(() => this.actions$.pipe(
            ofType(AuthActions.imageUpload),
            withLatestFrom(this.store.select('auth')),
            switchMap((data: any) => {
                let image;

                const userType = data[1].user.userType;

                // creates random string
                const pathFolder = `${userType}ProfileImage`;
                const ImageName = `${Date.now()}_${data[0].image.target.files[0].name}`;
                const path = `${pathFolder}/${ImageName}`;

                // reference
                const ref = this.storage.ref(path);

                // image
                image = this.storage.upload(path, data[0].image.target.files[0]);

                return forkJoin(
                    from(image.snapshotChanges()),
                    from(image)
                ).pipe(tap(() => {
                    if (data[1].user.photoUrl) {
                        this.storage.storage.refFromURL(`${data[1].user.photoUrl}`).delete();
                    }
                }), switchMap(() => {
                    return from(ref.getDownloadURL()).pipe(tap((url) => {
                        this.db.collection('users').doc(`${data[1].user.uid}`).update({
                            'data.profileImage': url
                        });
                    }), map(url => {
                        return AuthActions.changeProfileImage({imageUrl: url});
                    }));
                }), catchError(() => {
                    return EMPTY;
                }));

            })
    ));

    // profile settings

    updateProfileImage = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.changeProfileImage),
        tap((data) => {
            this.afAuth.auth.currentUser.updateProfile({
                photoURL: data.imageUrl
            });

            const dataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
            dataFromLocalStorage.photoUrl = data.imageUrl;
            localStorage.setItem('userData', JSON.stringify(dataFromLocalStorage));

        })
    ), {dispatch: false});

    // update user info
    updateUserInfo = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.updateUserInfo),
        withLatestFrom(this.store.select('auth')),
        tap((data) => {
            console.log(data);

            this.afAuth.auth.currentUser.updateProfile({
              displayName: data[0].firstName + ' ' + data[0].lastName
            }).then((data2: any) => {
              console.log(data2);
              this.db.collection('users').doc(`${data[1].user.uid}`).update({
                'data.firstName': data[0].firstName,
                'data.lastName': data[0].lastName
              });
            });

            const dataFromLocalStorageInfo = JSON.parse(localStorage.getItem('userData'));
            dataFromLocalStorageInfo.displayName = data[0].firstName + ' ' + data[0].lastName;
            dataFromLocalStorageInfo.firstName = data[0].firstName;
            dataFromLocalStorageInfo.lastName = data[0].lastName;
            localStorage.setItem('userData', JSON.stringify(dataFromLocalStorageInfo));

        }),
        switchMap((data: any) => {
          return of(AuthActions.authenticationSuccess({
            userType: data[1].user.userType,
                displayName: data[0].firstName + ' ' + data[0].lastName,
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                email: data[1].user.email,
                phoneNumber: data[1].user.phoneNumber,
                photoUrl: data[1].user.photoUrl,
                providerId: data[1].user.providerId,
                battalionCode: data[1].user.battalionCode,
                uid: data[1].user.uid,
                letAssigned: data[1].user.letAssigned,
                approved: true
          }));
        })
    ));

    // update user password
    updateUserPassword = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.passwordUpdate),
        withLatestFrom(this.store.select('auth')),
        switchMap((data: any) => {
            const credentials = firebase.auth.EmailAuthProvider.credential(data[1].user.email, data[0].oldPassword);


            return this.afAuth.auth.currentUser.reauthenticateWithCredential(credentials).then(() => {
                return this.afAuth.auth.currentUser.updatePassword(data[0].newPassword);
            }).then(() => {
                return AuthActions.passwordUpdateStatus({status: 'success'});
            }).catch(() => {
                return AuthActions.passwordUpdateStatus({status: 'error'});
            });

        })
    ));

    // update cadet personal data
    updateCadetInfo = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updateCadetInfo),
      withLatestFrom(this.store.select('auth')),
      tap((data: any) => {
        const newData = data[0].newPersonalData;
        const battalionCode = data[1].user.battalionCode;
        const cadetUid = data[1].user.uid;

        combineLatest(
          from(this.db.collection('users').doc(cadetUid).set({
            data: {
              firstName: newData.firstName,
              lastName: newData.lastName,
              letLevel: newData.letLevel,
              period: newData.period
            }
          }, {merge: true})).pipe(catchError(error => of(error))),
          from(this.db.doc(`battalions/${battalionCode}`).collection('cadetDataSheet').doc(battalionCode).set({
            [cadetUid]: {
              firstName: newData.firstName,
              lastName: newData.lastName,
              letLevel: newData.letLevel,
              period: newData.period
            }
          }, {merge: true})).pipe(catchError(error => of(error))),
          from(this.db.doc(`battalions/${battalionCode}`).collection('cadetsProgress').doc(battalionCode).set({
            [cadetUid]: {
              firstName: newData.firstName,
              lastName: newData.lastName,
              letLevel: newData.letLevel,
              period: newData.period
            }
          }, {merge: true})).pipe(catchError(error => of(error))),
          from(this.afAuth.auth.currentUser.updateProfile({
            displayName: newData.firstName + ' ' + newData.lastName
          }))
          );

        const dataFromLocalStorageInfo = JSON.parse(localStorage.getItem('userData'));
        dataFromLocalStorageInfo.displayName = newData.firstName + ' ' + newData.lastName;
        dataFromLocalStorageInfo.firstName = newData.firstName;
        dataFromLocalStorageInfo.lastName = newData.lastName;
        localStorage.setItem('userData', JSON.stringify(dataFromLocalStorageInfo));



      }),
      switchMap((data: any) => {
        const newData = data[0].newPersonalData;
        const user = data[1].user;
        return of(AuthActions.authenticationSuccess({
          userType: user.userType,
              displayName: newData.firstName + ' ' + newData.lastName,
              firstName: newData.firstName,
              lastName: newData.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoUrl: user.photoUrl,
              providerId: user.providerId,
              battalionCode: user.battalionCode,
              uid: user.uid,
              letAssigned: [newData.letLevel],
              approved: true
        }));
      })
    ));

    // update cadet battalion code
    updateBattalionCode = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updateBattalionCode),
      withLatestFrom(this.store.select('auth')),
      tap(() => console.log('1: check if battalion code exist')),
      switchMap((data: any) => {
        const newBattalionCode = data[0].newBattalionCode;

        // current battalion code
        const oldBattalionCode = data[1].user.battalionCode;

        // cadet uid
        const cadetUid =  data[0].cadetUid;

        if (newBattalionCode === oldBattalionCode) {
          console.log('battalion code is the same');
          return EMPTY;
        } else {
          try {
            return this.db.collection('battalionCodeTracker').doc('battalionCode').valueChanges().pipe(map((rdata: any) => {
              const battalionCodes = rdata.codes;
              if (battalionCodes.includes(newBattalionCode)) {
                return AuthActions.updateCodeExist({newBattalionCode, oldBattalionCode, cadetUid});
              } else {
                console.log('error');
                return AuthActions.updateCodeError();
              }
            }));
          } catch (error) {
            console.log(error);
          }
        }

      })
    ));

    updateBattalionCodeExist = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updateCodeExist),
      withLatestFrom(this.store.select('auth')),
      tap(() => console.log('2: get both of cadet data')),
      switchMap((data) => {
        const oldBattalionCode = data[1].user.battalionCode;
        const newBattalionCode = data[0].newBattalionCode;
        const cadetUid = data[0].cadetUid;

        try {
          return combineLatest(
            from(this.db.collection('battalions').doc(oldBattalionCode).collection('cadetsProgress').doc(oldBattalionCode).valueChanges()).pipe(take(1)),
            from(this.db.collection('battalions').doc(oldBattalionCode).collection('cadetDataSheet').doc(oldBattalionCode).valueChanges()).pipe(take(1))
          ).pipe(map(dbData => {
            const cadetDataSheet = dbData[1][cadetUid];
            const cadetsProgress = dbData[0][cadetUid];
            if (cadetDataSheet && cadetsProgress) {
              return AuthActions.updateCodeDataRetrieved({newBattalionCode, cadetDataSheet, cadetsProgress, cadetUid});
            } else {
              console.log('error');
              return AuthActions.updateCodeError();
            }

          }));
        } catch (error) {
          console.log(error);
        }

      })
    ));

    updateBattalionCodeRetrieved = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updateCodeDataRetrieved),
      withLatestFrom(this.store.select('auth')),
      tap(() => console.log('3: set and delete data')),
      switchMap(data => {
        const cadetUid = data[0].cadetUid;
        const newBattalionCode = data[0].newBattalionCode;
        const oldBattalionCode = data[1].user.battalionCode;
        const userType = data[1].user.userType;
        const cadetsProgress = data[0].cadetsProgress;
        const cadetDataSheet = data[0].cadetDataSheet;

        return combineLatest(
          from(this.db.collection('users').doc(cadetUid).set({data: {battalionCode: newBattalionCode}}, {merge: true})),
          from(this.db.collection('battalions').doc(newBattalionCode).collection('cadetDataSheet').doc(newBattalionCode).set({[cadetUid]: cadetDataSheet}, {merge: true})),
          from(this.db.collection('battalions').doc(newBattalionCode).collection('cadetsProgress').doc(newBattalionCode).set({[cadetUid]: cadetsProgress}, {merge: true})),
        ).pipe(tap((() => {
            combineLatest(
              from(this.db.collection('battalions').doc(oldBattalionCode).collection('cadetsProgress').doc(oldBattalionCode).update({[cadetUid]: firestore.FieldValue.delete()})),
              from(this.db.collection('battalions').doc(oldBattalionCode).collection('cadetDataSheet').doc(oldBattalionCode).update({[cadetUid]: firestore.FieldValue.delete()}))
            );

            if (userType === 'cadet') {
              const dataFromLocalStorageInfo = JSON.parse(localStorage.getItem('userData'));
              dataFromLocalStorageInfo.battalionCode = newBattalionCode;
              localStorage.setItem('userData', JSON.stringify(dataFromLocalStorageInfo));
            }
        })), map((rdata) => {
          return AuthActions.updateCodeSuccess({newBattalionCode});
        }));
      })
    ));


    // update user let assign
    updateLetAssign = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updateLetAssign),
      tap((data: any) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.letAssigned = data.letAssigned;
        localStorage.setItem('userData', JSON.stringify(userData));
      })
    ), {dispatch: false});


    passwordReset = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.passwordReset),
      tap((data: any) => {
        return from(this.afAuth.auth.sendPasswordResetEmail(data.email)).pipe(tap(() => {
          console.log('Error');
        }));
      })
    ), {dispatch: false});


    constructor(
        private actions$: Actions,
        private afAuth: AngularFireAuth,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private router: Router,
        private store: Store<fromRoot.State>
    ) {}
}
