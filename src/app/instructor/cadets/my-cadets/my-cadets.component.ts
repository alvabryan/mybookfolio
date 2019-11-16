import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { InstructorService } from '../../instructor.service';
import { FilterServiceService } from '../../shared-services/filter-service.service';
import { CadetPortfolioService } from '../../portfolio/cadet-portfolio.service';


//ngrx
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as PortfolioActions from '../../portfolio/store/portfolio.actions';

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
    private db: AngularFirestore, 
    private router: Router, 
    private instructorService: InstructorService, 
    private filterService: FilterServiceService,
    private cadetPortfolioService: CadetPortfolioService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.filterForm = new FormGroup({
      letLevel: new FormControl('all'),
      period: new FormControl('all')
    })

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if(data.cadetData.cadetRoster){
          const values = Object.values(data.cadetData.cadetRoster);
          this.filterRoster = values;
          this.battalionRoster = values;
        }
      })
    )
  }
 
  toCadetPortfolio(uid: string) {
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

  setSearchData(uid: string, firstname: string, lastName: string, letLevel: number ){
    
    this.store.dispatch(PortfolioActions.searchCadet({
      uid: uid,
      firstName: firstname,
      lastName: lastName,
      letLevel: letLevel
    }))

    this.router.navigate(['/instructor/cadet-portfolio']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
