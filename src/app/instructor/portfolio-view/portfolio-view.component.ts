import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs';
import { PortfolioViewService } from './portfolio-view.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterServiceService } from '../shared-services/filter-service.service';

// ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as PortfolioActions from '../../portfolio/store/portfolio.actions';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  pageTitle: string;
  pageUrl: string;
  subPageUrl: string;

  filterForm: FormGroup;

  filterRoster: Array<any>;
  battalionRosterFiltered: Array<any>;
  battalionRoster: Array<any>;
  battalionFilterStatus = 'My Cadets';



  constructor(
    private route: ActivatedRoute,
    private portfolioViewService: PortfolioViewService,
    private filterService: FilterServiceService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      letLevel: new FormControl('all'),
      period: new FormControl('all')
    });

    this.subscription.add(
      this.route.queryParams.pipe(take(1)).subscribe( (params: Params) => {
        this.pageTitle = params.name;
        const url = params.url.split('_');
        if (url.length === 2) {
          this.pageUrl = url[0];
          this.subPageUrl = url[1];
        } else {
          this.pageUrl = url[0];
          this.subPageUrl = '';
        }
      })
    );

    this.subscription.add(
      combineLatest(
        this.store.select('auth'),
        this.store.select('instructor')
      ).subscribe((data: any) => {
        const cadetProgress = Object.values(data[1].cadetData.cadetProgress);
        this.setCadetRoster(data[0].user.letAssigned, cadetProgress);
      })
    );
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

  setCadetRoster(letAssigned: Array<any>, cadetRoster: any) {


    const filteredData: Array<any> = [];

    cadetRoster.forEach((data: any, ) => {
      if (letAssigned.includes(+data.letLevel)) {
        const cadetData = data;
        filteredData.push(cadetData);
      }
    });

    this.battalionRosterFiltered = this.filterRoster = filteredData;
    this.battalionRoster = cadetRoster;
  }

  setCadetSearchData(searchCadetDataIndex: number) {
    const searchCadet = this.filterRoster[searchCadetDataIndex];
    this.store.dispatch(PortfolioActions.searchCadet({
      uid: searchCadet.uid,
      firstName: searchCadet.firstName,
      lastName: searchCadet.lastName,
      letLevel: searchCadet.letLevel,
      period: searchCadet.period
    }));

    this.setTaskName();
  }

  onFilter() {
    const letLevel = this.filterForm.value.letLevel;
    const period = this.filterForm.value.period;

    const dataToFilter = this.battalionFilterStatus === 'My Cadets' ? this.battalionRosterFiltered : this.battalionRoster;

    this.filterRoster = this.filterService.filter(letLevel, period, dataToFilter);
  }

  progress(i: number) {
    return this.portfolioViewService.getProgress(i, this.pageTitle, this.filterRoster);
  }

  setTaskName(taskName = this.pageTitle) {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: taskName}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
