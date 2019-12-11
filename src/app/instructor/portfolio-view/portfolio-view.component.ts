import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { InstructorService } from '../instructor.service';
import { Subscription } from 'rxjs';
import { PortfolioViewService } from './portfolio-view.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterServiceService } from '../shared-services/filter-service.service';
import { CadetPortfolioService } from '../portfolio/cadet-portfolio.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as InstructorActions from '../store/instructor.actions';
import * as PortfolioActions from '../portfolio/store/portfolio.actions';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  pageTitle: string;
  pageUrl: string;

  filterForm: FormGroup;

  filterData: Array<any>;
  cadetsData: Array<any>;

  constructor(
    private route: ActivatedRoute, 
    private instructorService: InstructorService, 
    private portfolioViewService: PortfolioViewService, 
    private filterService: FilterServiceService,
    private cadetPortfolioSerivce: CadetPortfolioService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      letLevel: new FormControl('all'),
      period: new FormControl('all')
    })

    this.subscription.add(
      this.route.queryParams.pipe(take(1)).subscribe( (params: Params) => {
        this.pageTitle = params['name'];
        this.pageUrl = params['url'];
      })
    );

    this.subscription.add(
      this.store.select('instructor').subscribe( (data: any) => {
        if(data.cadetData.cadetProgress){
          const values = Object.values(data.cadetData.cadetProgress);
          this.cadetsData = values;
          this.filterData = values;
        }
      })
    );
    
    
  }

  setCadetSearchData(searchCadetDataIndex: number){
    const searchCadet = this.cadetsData[searchCadetDataIndex];
    this.store.dispatch(PortfolioActions.searchCadet({
      uid: searchCadet.uid,
      firstName: searchCadet.firstName,
      lastName: searchCadet.lastName,
      letLevel: searchCadet.letLevel
    }))
  }

  onFilter() {
    const letLevel = this.filterForm.value.letLevel;
    const period = this.filterForm.value.period;

    this.filterData = this.filterService.filter(letLevel,period,this.cadetsData);
  }

  progress(i: number) {
    return this.portfolioViewService.getProgress(i,this.pageTitle, this.cadetsData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
