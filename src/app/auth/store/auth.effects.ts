import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { User } from '../user.model';

import { switchMap, exhaustMap, mergeMap, catchError, tap, map, delay, take } from 'rxjs/operators';

// auth action
import * as AuthActions from './auth.actions';
import { of, EMPTY, from, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

const handleAuthentication = (userType:string,displayName: string, email: string, phoneNumber:string, photoUrl: string, providerId: string, battalionCode: string, uid: string) => {
    const user = new User(userType,displayName, email, phoneNumber, photoUrl, providerId, battalionCode, uid);
    localStorage.setItem('userData', JSON.stringify(user));

    return AuthActions.authenticationSuccess({
        userType: userType,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoUrl,
        providerId: user.providerId,
        battalionCode: battalionCode,
        uid: user.uniqueId
    })
}

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
        errorMessage = message
    }

    // of creates a new observable
    return of(AuthActions.authenticateFail({error: errorMessage}));
}


@Injectable()
export class AuthEffects {

    // clear auth error
    clearError = createEffect(()=>this.actions$.pipe(
        ofType(AuthActions.authenticateFail),
        map(()=>{
            return AuthActions.clearError();
        })
    ))

    // login effect
    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginStart),
        switchMap((action) => {
            return from(this.afAuth.auth.signInWithEmailAndPassword(action.email,action.password)).pipe(mergeMap((data: any)=>{
                return this.db.doc(`users/${data.user.uid}`).valueChanges().pipe(map((userDataType: any)=>{
                    return handleAuthentication(userDataType.userType,data.user.displayName, data.user.email, data.user.phoneNumber, data.user.photoURL, data.user.providerId, userDataType.data.battalionCode, data.user.uid)
                }));
            }), catchError(err => {console.log(err); return handleError(err.code, err.message);}))
        })
    )) 

    // refresh page auto login
    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.refreshWindow), () => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if(userData){
            return of(AuthActions.authenticationSuccess({
                userType: userData.userType,
                displayName: userData.displayName,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                photoUrl: userData.photoUrl,
                providerId: userData.providerId,
                battalionCode: userData.battalionCode,
                uid: userData.uniqueId
            }));
        } else {
            return EMPTY;
        }
        
    })

    // redirect user based on type
    authRedirect = createEffect(()=> this.actions$.pipe(
        ofType(AuthActions.authenticationSuccess),
        tap((data)=>{
           if(data.userType == 'cadet') {
            this.router.navigate(['/cadet'])
           } else if (data.userType == 'instructor') {
               this.router.navigate(['/instructor']);
           }
        })
    ), {dispatch: false})

    
    // log user out
    logout = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(()=> {
            this.router.navigate(['/']);
            localStorage.clear();
        })
    ), {dispatch: false})




    // cadet signup

    cadetSignupStart = createEffect(()=> 
        this.actions$.pipe(
            ofType(AuthActions.cadetSignupStart),
            switchMap((data:any) => {
                return this.db.doc(`battalionCodeTracker/battalionCode`).valueChanges().pipe(take(1),map((callBackData: any)=>{
                    console.log(callBackData);
                    if(callBackData.codes.includes(data.battalionCode)) {
                        return AuthActions.cadetRegister({...data})
                    }else{
                        return AuthActions.authenticateFail({error: 'Battalion Code not found'});
                    }
                }))
            })
        )
    )


    cadetSignup = createEffect(()=> this.actions$.pipe(
            ofType(AuthActions.cadetRegister),
            switchMap((data:any) => {
                return from(this.afAuth.auth.createUserWithEmailAndPassword(data.email,data.password)).pipe(
                    tap((userCredential) => {
                        userCredential.user.updateProfile({
                            displayName: data.firstName + ' ' + data.lastName,
                            photoURL: null
                        })  
                    }),
                    map((userCredential)=>{
                        console.log(userCredential);
                        return AuthActions.cadetSignupSuccess({...data,...userCredential});
                    }),
                    catchError((err)=>{
                        return handleError(err.code,err.message)
                    })
                )
            })
        )
    ) 

    cadetSignupSuccess = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.cadetSignupSuccess),
        switchMap((data:any) => {
            const appUserData = { 
                firstName: data.firstName, 
                lastName: data.lastName, 
                letLevel: data.letLevel, 
                period: data.classPeriod, 
                uid: data.user.uid,
                progress: {}
              }
            
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
                  },{ merge: true})
                ),
                from(
                    this.db.doc(`battalions/${data.battalionCode}/cadets/${data.user.uid}`).set(appUserData)
                ),
                from(
                    this.db.doc(`battalions/${data.battalionCode}/cadetsProgress/${data.battalionCode}`).set({ [data.user.uid] : { ...appUserData } }, {merge: true})
                )
            ).pipe(map(()=>{
                return AuthActions.loginStart({email: data.email, password: data.password});
            }))
        }),
        tap((data: any) => {
            console.log(data);

        })
    ))






    constructor(
        private http: HttpClient,
        private actions$: Actions, 
        private afAuth: AngularFireAuth, 
        private db: AngularFirestore,
        private router: Router
    ){}
}