import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CadetService } from '../../service/cadet.service';

@Injectable({
  providedIn: 'root'
}) 
export class FirebasePortfolioService {

  // logged in user
  user: any;

  // logged in user data
  cadetUserData: any;

  // let level user selected
  selectLetLevel = new BehaviorSubject<any>('');

  // last updated subject
  lastUpdated = new Subject();

  constructor(private cadetService: CadetService, private db: AngularFirestore) {
    // gets user from auth
    // this.auth.user.subscribe(data => {
    //   this.user = data;
    //   this.selectLetLevel.next(data.data.letLevel);
    // });
  }

  // change let level
  changeLetLevel(letLevel: number) {
    this.selectLetLevel.next(letLevel);
  }

  // get the current let level
  getCurrentLetLevel() {
    let returnLet = null;
    this.selectLetLevel.subscribe(letLevel => {
      returnLet = letLevel;
    });
    return returnLet;
  }

  // get data from firebase: goals
  cadetGoals() {
    return this.db.collection(`portfolio`).doc('etURkGdh4PUO8bqIPLb7XJb88A92').collection('yearlyGoals').doc('etURkGdh4PUO8bqIPLb7XJb88A92').valueChanges();
  }

  // set data from firebase: goals
  setCadetGoals(goalContent: any) {
      const data = {};
      data[this.getCurrentLetLevel()] = {
        dateSubmitted: new Date(),
        goal: goalContent
      };

      this.db.collection(`portfolio`).doc(this.user.uid).collection('yearlyGoals').doc(this.user.uid)
      .set(data, {merge: true}).then(() => {
        alert('Your data was submitted');
      });

  }

  // get data from firebase: winning colors
  getWinningColors() {
    return this.db.collection(`portfolio`).doc(this.user.uid).collection('WinningColors').valueChanges().pipe(map( data => {
      return {
        ...data[0]
      };
    }));
  }

  // set data from firebase: winning colors
  setWinningColors(winningColorsData: any) {
    const data = {};
    data[this.getCurrentLetLevel()] = {
      dateSubmitted: new Date(),
      ...winningColorsData
    };
    this.db.collection(`portfolio`).doc(this.user.uid).collection('WinningColors').doc(this.user.uid).set(
      data, {merge: true}).then( () => {
        alert('Data Submitted:' + data);
      });
  }




}
