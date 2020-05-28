import { Component, OnInit, OnDestroy } from '@angular/core';


import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as PortfolioActions from '../../portfolio/store/portfolio.actions';
import * as SearchCadetActions from './store-searchcadet/searchCadet.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FilterServiceService } from '../shared-services/filter-service.service';


@Component({
  selector: 'app-cadets',
  templateUrl: './cadets.component.html',
  styleUrls: ['./cadets.component.css']
})
export class CadetsComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;

  subscription: Subscription = new Subscription();

  filterRoster: Array<any>;
  battalionRosterFiltered: Array<any>;
  battalionRoster: Array<any>;
  battalionFilterStatus = 'My Cadets';

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private filterService: FilterServiceService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.filterForm = new FormGroup({
      letLevel: new FormControl('all'),
      period: new FormControl('all')
    });

    this.subscription.add(
      combineLatest(
        this.store.select('auth'),
        this.store.select('instructor')
      ).subscribe((data: any) => {
        if (data[0].user && data[1].cadetData) {
          const cadetProgress = Object.values(data[1].cadetData.cadetProgress);
          this.setUserData(data[0].user.letAssigned, cadetProgress);
        }
      })
    );
  }

  setUserData(letAssigned: Array<any>, cadetRoster: any) {


    const filteredData: Array<any> = [];

    cadetRoster.forEach((data: any, ) => {
      if (letAssigned.includes(data.letLevel)) {
        const cadetData = data;
        filteredData.push(cadetData);
      }
    });

    this.battalionRosterFiltered = this.filterRoster = filteredData;
    this.battalionRoster = cadetRoster;
  }

  toCadetPortfolio(uid: string) {
    const cadetUid = uid.replace(/\s/g, '');
    this.router.navigate(['/instructor/cadet-portfolio'], { queryParams: { uid: cadetUid } });
  }

  onChangeSearch(event) {
    if (event.target.value === 'All Cadets') {
      this.filterRoster = this.battalionRoster;
      this.battalionFilterStatus = 'All Cadets';
    } else {
      this.battalionFilterStatus = 'My Cadets';
      this.filterRoster = this.battalionRosterFiltered;
    }

    this.filterForm.setValue({ letLevel: 'all', period: 'all' });
  }

  onFilter() {
    // this.filterRoster = [];
    const letLevel = this.filterForm.value.letLevel;
    const period = this.filterForm.value.period;

    const dataToFilter = this.battalionFilterStatus === 'My Cadets' ? this.battalionRosterFiltered : this.battalionRoster;

    this.filterRoster = this.filterService.filter(letLevel, period, dataToFilter);

  }

  setSearchData(uid: string, firstname: string, lastName: string, letLevel: number) {

    this.store.dispatch(PortfolioActions.searchCadet({
      // tslint:disable-next-line: object-literal-shorthand
      uid: uid,
      firstName: firstname,
      // tslint:disable-next-line: object-literal-shorthand
      lastName: lastName,
      // tslint:disable-next-line: object-literal-shorthand
      letLevel: letLevel
    }));

    this.store.dispatch(SearchCadetActions.setSearchCadet({
      // tslint:disable-next-line: object-literal-shorthand
      uid: uid,
      firstName: firstname,
      // tslint:disable-next-line: object-literal-shorthand
      lastName: lastName,
      // tslint:disable-next-line: object-literal-shorthand
      letLevel: letLevel
    }));

    this.router.navigate(['/instructor/cadet-portfolio']);
  }

  deleteCadet(cadetUid: string, firstName: string, lastName: string) {
    const confirmDelete = confirm(`Are you sure you want to remove ${lastName}, ${firstName} from your battalion?`);
    console.log(cadetUid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
