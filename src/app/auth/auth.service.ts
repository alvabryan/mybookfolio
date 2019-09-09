import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { User } from './user.model';
import { take, map, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authError = new Subject();

  // user observable
  user = new BehaviorSubject<any>(null);

  // new user variable
  newUser: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router ) { }


  // error handling
  authErrorHandling(message: any) {
    let emitError = 'Something went wrong';
    switch (message.code) {
      case 'auth/user-not-found':
        emitError = 'There is no user record corresponding to this email.';
        break;
      case 'auth/wrong-password':
        emitError = 'The password is invalid.';
        break;
      case 'auth/unvalid-password':
        emitError = message.message;
        break;
      case 'auth/email-already-in-use':
        emitError = message.message;
        break;
      default:
        emitError = emitError;
    }

    this.authError.next(emitError);
  }

  // email validation
  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // login method
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then( userCredential => {
      if ( userCredential ) {

        this.afAuth.authState.pipe(mergeMap( (data: any) => {
          return this.db.doc(`users/${data.uid}`).valueChanges().pipe(map( (userData: any) => {
            return {
              userType: userData.userType,
              data: {
                ...data.providerData[0],
                uid: data.uid,
                ...userData.data
              }
            };
          }));
        })).pipe(tap((data) => {
          if (data.userType === 'cadet') {
            this.router.navigate(['/cadet']);
          } else {
            this.router.navigate(['/instructor']);
          }

        })).subscribe( user => {
          // set data from logged in user to observable
          this.user.next(user);

          // store user in the local storage
          localStorage.setItem('userData', JSON.stringify(user));

        });
      }
    }).catch( error => {
      this.authErrorHandling(error);
    });
  }

  // auto login
  autoLogin() {
    // get user from localstorage
    const user = JSON.parse(localStorage.getItem('userData'));

    // check if there was a user
    if (!user) {
      return;
    } else {

      // send loginUser to your observable
      if (user.data.uid) {
        this.user.next(user);
      }
    }
  }

  // signup method
  createUser(user) {
    this.newUser = user;

    this.afAuth.auth.createUserWithEmailAndPassword(user.data.email, user.data.password).then(
      userCredential => {

        userCredential.user.updateProfile({
          displayName: user.data.firstName + ' ' + user.data.lastName
        });

        this.insertUserData(userCredential).then(() => {
          this.login(this.newUser.data.email, this.newUser.data.password);
        });
      }
    ).catch( error => {
      this.authErrorHandling(error);
    });
  }

  // signup user method
  insertUserData(userCredential: firebase.auth.UserCredential) {
    if ( this.newUser.type === 'cadet') {

      return this.db.doc(`users/${userCredential.user.uid}`).set({
        userType: this.newUser.type,
        data: {
          battalionCode: this.newUser.data.battalionCode,
          firstName: this.newUser.data.firstName,
          lastName: this.newUser.data.lastName,
          letLevel: this.newUser.data.letLevel,
          classPeriod: this.newUser.data.classPeriod
        }
      });

    } else if ( this.newUser.type === 'instructor') {

      return this.db.doc(`users/${userCredential.user.uid}`).set({
        userType: this.newUser.type,
        data: {
          battalionCode: this.newUser.data.battalionCode,
          firstName: this.newUser.data.firstName,
          lastName: this.newUser.data.lastName,
          instructorType: this.newUser.data.instructorType,
          phoneNumber: this.newUser.data.phoneNumber
        }
      }).then(() => {
        this.db.doc(`battalions/${this.newUser.data.battalionCode}`).set({
          schoolName: this.newUser.data.schoolName,
          state: this.newUser.data.state,
          city: this.newUser.data.city,
          zipCode: this.newUser.data.zipCode,
          battalionCode: this.newUser.data.battalionCode
        });
      });



    }


  }

  passwordReset(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then( () => {
      console.log('Email Sent');
      return true;
    }).catch( error => {
      this.authErrorHandling(error);
      return false;
    });
  }


  // logout method
  logout() {
    localStorage.clear();
    this.user.next(null);
    this.router.navigate(['/']);
    return this.afAuth.auth.signOut();
  }

}
