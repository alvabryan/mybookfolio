import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { User } from '../user.model';

import { switchMap, exhaustMap, mergeMap, catchError, tap, map, delay, take, withLatestFrom } from 'rxjs/operators';

// auth action
import * as AuthActions from './auth.actions';
import { of, EMPTY, from, forkJoin, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/storage';

interface InstructorLetAssign {
    let1: boolean;
    let2: boolean;
    let3: boolean;
    let4: boolean;
}

const handleAuthentication = (userType: string, displayName: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoUrl: string, providerId: string, battalionCode: string, uid: string, letAssign: InstructorLetAssign) => {
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
        letAssigned: letAssign
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
            return from(this.afAuth.auth.signInWithEmailAndPassword(action.email, action.password)).pipe(mergeMap((data: any) => {
                return this.db.doc(`users/${data.user.uid}`).valueChanges().pipe(map((userDataType: any) => {
                  return handleAuthentication(userDataType.userType, data.user.displayName, userDataType.data.firstName, userDataType.data.lastName, data.user.email, data.user.phoneNumber, data.user.photoURL, data.user.providerId, userDataType.data.battalionCode, data.user.uid, userDataType.data.letLevel );
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
                letAssigned: userData.letAssigned
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
              this.router.navigate(['/cadet']);
           } else if (data.userType === 'instructor') {
              this.router.navigate(['/instructor']);
           }
        })
    ), {dispatch: false});

    // cadet signup
    cadetSignupStart = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.cadetSignupStart),
            switchMap((data: any) => {
                return this.db.doc(`battalionCodeTracker/battalionCode`).valueChanges().pipe(take(1), map((callBackData: any) => {
                    console.log(callBackData);
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
                from(this.db.doc(`battalions/${data.battalionCode}/cadetsRoster/${data.battalionCode}`).set({
                    [data.user.uid] : {
                      firstName: data.firstName,
                      lastName: data.lastName,
                      letLevel: data.letLevel,
                      period: data.classPeriod,
                      uid: data.user.uid
                    }
                  }, { merge: true})
                ),
                from(
                    this.db.doc(`battalions/${data.battalionCode}/cadets/${data.user.uid}`).set(appUserData)
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
                }), catchError((err) => {
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
            this.afAuth.auth.currentUser.updateProfile({
                displayName: data[0].firstName + ' ' + data[0].lastName
            });

            this.db.collection('users').doc(`${data[1].user.uid}`).update({
                'data.firstName': data[0].firstName,
                'data.lastName': data[0].lastName
            });

            const dataFromLocalStorageInfo = JSON.parse(localStorage.getItem('userData'));
            dataFromLocalStorageInfo.displayName = data[0].firstName + ' ' + data[0].lastName;
            dataFromLocalStorageInfo.firstName = data[0].firstName;
            dataFromLocalStorageInfo.lastName = data[0].lastName;
            localStorage.setItem('userData', JSON.stringify(dataFromLocalStorageInfo));

        })
    ), {dispatch: false});

    // update user password
    updateUserPassword = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.passwordUpdate),
        withLatestFrom(this.store.select('auth')),
        switchMap((data: any) => {
            const updateStatus = null;
            const credentials = firebase.auth.EmailAuthProvider.credential(data[1].user.email, data[0].oldPassword);


            return this.afAuth.auth.currentUser.reauthenticateWithCredential(credentials).then(returnData => {
                return this.afAuth.auth.currentUser.updatePassword(data[0].newPassword);
            }).then(() => {
                return AuthActions.passwordUpdateStatus({status: 'success'});
            }).catch((error) => {
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
          }, {merge: true})),
          from(this.db.doc(`battalions/${battalionCode}`).collection('cadetDataSheet').doc(battalionCode).set({
            [cadetUid]: {
              firstName: newData.firstName,
              lastName: newData.lastName,
              letLevel: newData.letLevel,
              period: newData.period
            }
          }, {merge: true})),
          from(this.db.doc(`battalions/${battalionCode}`).collection('cadetsProgress').doc(battalionCode).set({
            [cadetUid]: {
              firstName: newData.firstName,
              lastName: newData.lastName,
              letLevel: newData.letLevel,
              period: newData.period
            }
          }, {merge: true}))
          ).pipe(tap((response) => console.log(response)));
      })
    ), {dispatch: false});

    // update cadet battalion code
    updateBattalionCode = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updateBattalionCode),
      tap((data: any) => {
        console.log(data);
      })
    ), {dispatch: false});

    // update user let assign
    updateLetAssign = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updateLetAssign),
      tap((data: any) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.letAssigned = data.letAssigned;
        localStorage.setItem('userData', JSON.stringify(userData));
      })
    ), {dispatch: false});



    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private afAuth: AngularFireAuth,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private router: Router,
        private store: Store<fromRoot.State>
    ) {}
}
