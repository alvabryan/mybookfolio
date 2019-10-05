import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { InstructorService } from '../../instructor.service';

@Component({
  selector: 'app-my-cadets',
  templateUrl: './my-cadets.component.html',
  styleUrls: ['./my-cadets.component.css']
})
export class MyCadetsComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;

  subscription: Subscription = new Subscription();

  filterRoster: Array<any>;
  battalionRoster: Array<any>;

  constructor(private auth: AuthService , private db: AngularFirestore, private router: Router, private instructorService: InstructorService) { }

  ngOnInit() {

    this.filterForm = new FormGroup({
      let: new FormControl('all'),
      period: new FormControl('all')
    })

    this.subscription.add(
      this.instructorService.battalionRoster.subscribe(data => {
        const values = Object.values(data);
        this.battalionRoster = values;
        this.filterRoster = this.battalionRoster;
      })
    );

  }
 
  toCadetPortfolio(uid) {
    const cadetUid = uid.replace(/\s/g, "");
    console.log(uid);
    this.router.navigate(['/instructor/cadet-portfolio'], {queryParams:{uid:cadetUid}});
  }

  onFilter(){
    this.filterRoster = [];
    const letLevel = this.filterForm.value.let;
    const period = this.filterForm.value.period;

    this.battalionRoster.forEach((data)=>{
      if(letLevel == 'all' && period == 'all') {
        this.filterRoster = this.battalionRoster;
      } else if (letLevel != 'all' && period == 'all') {
        if( data.letLevel == letLevel) {
          this.filterRoster.push(data);
        }
      } else if (letLevel == 'all' && period != 'all') {
        if( data.period == period) {
          this.filterRoster.push(data);
        }
      } else if (letLevel != 'all' && period != 'all' ) {
        if( data.period == period && data.letLevel == letLevel) {
          this.filterRoster.push(data);
        }
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
