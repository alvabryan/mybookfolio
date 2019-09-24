import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  battalionCode: any;

  constructor(private auth: AuthService ,private db: AngularFirestore ) {
    this.auth.user.pipe(take(1)).subscribe(data => {
      this.battalionCode = data.data.battalionCode;
    })
  }


  // cadets tab
  getBattalionRoster() {
    return this.db.collection('battalions').doc(this.battalionCode).collection('cadetsRoster').valueChanges();
  }

}
