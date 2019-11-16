import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-portfolio-resume',
  templateUrl: './portfolio-resume.component.html',
  styleUrls: ['./portfolio-resume.component.css']
})
export class PortfolioResumeComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Resume'}));
  }

}
