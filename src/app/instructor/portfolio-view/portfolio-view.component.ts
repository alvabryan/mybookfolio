import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { InstructorService } from '../instructor.service';
import { Subscription } from 'rxjs';
import { PortfolioViewService } from './portfolio-view.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterServiceService } from '../shared-services/filter-service.service';
import { CadetPortfolioService } from '../portfolio/cadet-portfolio.service';

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
    private cadetPortfolioSerivce: CadetPortfolioService) { }

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
      this.instructorService.getPortfolioProgress().subscribe(data => {
        const values = Object.values(data);
        this.cadetsData = values;
        this.filterData = values;
      })
    );
    
    
  }


  onFilter() {
    // this.filterRoster = [];
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
