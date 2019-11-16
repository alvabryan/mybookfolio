import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadet',
  templateUrl: './cadet.component.html',
  styleUrls: ['./cadet.component.css']
})
export class CadetComponent implements OnInit, OnDestroy  {

  private cadetSubscription: Subscription = new Subscription();

  user: firebase.User;
  userLoaded = false;

  constructor( private db: AngularFirestore) { }

  ngOnInit() {
    // this.cadetSubscription.add(this.auth.user.subscribe( user => {
    //   this.user = user;
    //   this.userLoaded = true;
    // }));

  }

  ngOnDestroy(): void {
    this.cadetSubscription.unsubscribe();
  }


}
