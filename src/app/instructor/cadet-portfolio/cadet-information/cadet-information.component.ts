import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, map, mergeMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as InstructorActions from '../../store/instructor.actions';
import * as PortfolioActions from '../../../portfolio/store/portfolio.actions';
import * as SearchCadetActions from '../../cadets/store-searchcadet/searchCadet.actions';
import * as AuthActions from '../../../auth/store/auth.actions';
@Component({
  selector: 'app-cadet-information',
  templateUrl: './cadet-information.component.html',
  styleUrls: ['./cadet-information.component.css']
})
export class CadetInformationComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  searchedCadet = null;
  personalInfo: FormGroup;

  constructor(private db: AngularFirestore, private router: ActivatedRoute, private route: Router, private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.personalInfo = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      letLevel: new FormControl(''),
      period: new FormControl('')
    });

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if (data.currentCadet.cadetSearchData) {
          this.searchedCadet = data.currentCadet.cadetSearchData;

          this.personalInfo.setValue({
            firstName: data.currentCadet.cadetSearchData.firstName,
            lastName: data.currentCadet.cadetSearchData.lastName,
            letLevel: data.currentCadet.cadetSearchData.letLevel,
            period: data.currentCadet.cadetSearchData.period
          });
        }
      })
    );
  }

  // get personal info form controls
  get firstName() { return this.personalInfo.get('firstName'); }
  get lastName() { return this.personalInfo.get('lastName'); }

  toCadetPortfolio() {
    this.route.navigate(['/instructor/cadet-portfolio']);
  }


  onSubmitPersonalInfo() {
    const newData = {
      firstName: this.personalInfo.value.firstName,
      lastName: this.personalInfo.value.lastName,
      letLevel: this.personalInfo.value.letLevel,
      period: this.personalInfo.value.period,
      uid: this.searchedCadet.uid
    };

    this.store.dispatch(AuthActions.updateCadetInfoByInstructor({newPersonalData: newData}));

    this.store.dispatch(SearchCadetActions.setSearchCadet(newData));
    this.store.dispatch(PortfolioActions.searchCadetData(newData));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
