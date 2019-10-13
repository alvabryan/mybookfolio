import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  // instructor data
  instructorData = new BehaviorSubject({});

  //battalionCode
  battalionCode: string;

  // battalion data
  battalionData = new BehaviorSubject([]);

  // battalion progress data
  battalionProgressData = new BehaviorSubject([]);

  // battalion roster
  battalionRoster = new BehaviorSubject([]);

  // search data
  searchData = new BehaviorSubject([]);

  constructor(private auth: AuthService ,private db: AngularFirestore) { 
    this.auth.user.subscribe(data => {
      this.battalionCode = data.data.battalionCode;
      this.instructorData.next(data.data);
    })
  }

  // used to retrieve cadets progress
  getData() {
    // cadets progress
    this.db.doc(`battalions/${this.battalionCode}/cadetsProgress/${this.battalionCode}`).valueChanges().subscribe( (data: any) => {
      // const cadetsArray = Object.values(data);
      this.battalionData.next(data);
      console.log(data);
    });

    // cadets battalion roster
    this.db.collection('battalions').doc(this.battalionCode).collection('cadetsRoster').valueChanges().subscribe((data: any) => {
      this.battalionRoster.next(data[0]);
    });

    console.log('get data ran');
  }



  // used to get cadet portfolio progres
  // link: instructor/portfolio-view
  getPortfolioProgress() {
    return this.battalionData;
  }

  // used to show specific cadet progress and data
  // link: cadet-portfolio-view
  getCadetInformation() {
    return this.battalionData;
  }

  
}
