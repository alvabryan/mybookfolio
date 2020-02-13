import { Component, OnInit } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../instructor/store/index';
import * as PortfolioActions from '../store/portfolio.actions';
@Component({
  selector: 'app-portfolio-cadet-challenge',
  templateUrl: './portfolio-cadet-challenge.component.html',
  styleUrls: ['./portfolio-cadet-challenge.component.css']
})
export class PortfolioCadetChallengeComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {

  }

}
