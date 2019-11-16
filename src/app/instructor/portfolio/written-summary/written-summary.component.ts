import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
@Component({
  selector: 'app-written-summary',
  templateUrl: './written-summary.component.html',
  styleUrls: ['./written-summary.component.css']
})
export class WrittenSummaryComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Service Learning'}));
  }

}
