import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../instructor/store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-financial-planning',
  templateUrl: './financial-planning.component.html',
  styleUrls: ['./financial-planning.component.css']
})
export class FinancialPlanningComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {

  }

}
