import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { InstructorService } from '../instructor.service';
import { Subscription } from 'rxjs';
import { PortfolioViewService } from './portfolio-view.service';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  pageTitle: string;
  pageUrl: string;

  cadetsData: any;

  constructor(private route: ActivatedRoute, private instructorService: InstructorService, private portfolioViewService: PortfolioViewService) { }

  ngOnInit() {
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
      })
    );
    
    
  }

  progress(i: number) {
    return this.portfolioViewService.getProgress(i,this.pageTitle, this.cadetsData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
