import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebasePortfolioService } from './service/firebase-portfolio.service';
import { PageTitleService } from './service/page-title.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  pageTitle: string;
  letLevel: number;

  private portfolioSubscription: Subscription = new Subscription();

  // last updated
  lastUpdated: any;

  constructor(private getPageTitle: PageTitleService, private portfolioService: FirebasePortfolioService) {}

  ngOnInit() {
    this.portfolioSubscription.add(this.getPageTitle.pageTitle.subscribe( title => this.pageTitle = title ));

    this.portfolioSubscription.add(this.portfolioService.selectLetLevel.subscribe( letLevel => {
      this.letLevel = letLevel;
    }));
    this.portfolioSubscription.add(this.portfolioService.lastUpdated.subscribe( (data: any) => {
      if ( data ) {
        const newDate = new Date(data.seconds * 1000);
        this.lastUpdated = newDate;
      } else {
        this.lastUpdated = '';
      }
    }));

  }

  ngOnDestroy() {
    this.portfolioSubscription.unsubscribe();
  }

  setLetLevel(letLevel: number) {
    this.portfolioService.changeLetLevel(letLevel);
  }

}
