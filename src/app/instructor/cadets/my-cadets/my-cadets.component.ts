import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { InstructorService } from '../../instructor.service';
import { FilterServiceService } from '../../shared-services/filter-service.service';

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

  constructor(
    private auth: AuthService, 
    private db: AngularFirestore, 
    private router: Router, 
    private instructorService: InstructorService, 
    private filterService: FilterServiceService) { }

  ngOnInit() {

    this.filterForm = new FormGroup({
      letLevel: new FormControl('all'),
      period: new FormControl('all')
    })

    this.subscription.add(
      this.instructorService.battalionRoster.subscribe(data => {
        const values = Object.values(data);
        this.battalionRoster = values;
        this.filterRoster = values;
      })
    );

  }
 
  toCadetPortfolio(uid) {
    const cadetUid = uid.replace(/\s/g, "");
    console.log(uid);
    this.router.navigate(['/instructor/cadet-portfolio'], {queryParams:{uid:cadetUid}});
  }

  onFilter(){
    // this.filterRoster = [];
    const letLevel = this.filterForm.value.letLevel;
    const period = this.filterForm.value.period;

    this.filterRoster = this.filterService.filter(letLevel,period,this.battalionRoster);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
