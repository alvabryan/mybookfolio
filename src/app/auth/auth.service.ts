import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';
import { take, map, tap } from 'rxjs/operators';

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

          this.afAuth.authState.pipe(take(1), map( user => {
            // maps the returned data from the post request and only returns providerData and users unique id

              return {
                ...user.providerData[0],
                uid: user.uid
              };
          }), tap( () => {

            // sends user to the dashboard if there were no errors
            this.router.navigate(['/cadet/dashboard']);

          } )).subscribe( user => {
            console.log(user);
            // pass user through the User model
            const loginUser = new User(user.displayName, user.email, user.phoneNumber, user.photoURL, user.providerId, user.uid );

            // set login user to the user observable
            this.user.next(loginUser);
            // store user in your local storage
            localStorage.setItem('userData', JSON.stringify(loginUser));

          });

      }
    }).catch( error => {
      this.authErrorHandling(error);
    });
  }

  // auto login
  autoLogin() {
    // get user from localstorage
    const user: {
      displayName: string;
      email: string;
      phoneNumber: string;
      photoUrl: string;
      providerId: string;
      uid: string;
    } = JSON.parse(localStorage.getItem('userData'));

    // check if there was a user
    if (!user) {
      return;
    } else {
      // pass user tnrough your model
      const loginUser = new User(user.displayName, user.email, user.phoneNumber, user.photoUrl, user.providerId, user.uid);

      // send loginUser to your observable
      if (loginUser.uniqueId) {
        this.user.next(loginUser);
      }
    }



  }

  // signup method
  createUser(user) {
    this.newUser = user;

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
      userCredential => {

        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential).then(() => {
          this.login(this.newUser.email, this.newUser.password);
        });
      }
    ).catch( error => {
      this.authErrorHandling(error);
    });
  }

  // signup user method
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`users/${userCredential.user.uid}`).set({
      battalionCode: this.newUser.battalionCode,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      letLevel: this.newUser.letLevel,
      classPeriod: this.newUser.classPeriod
    });
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
