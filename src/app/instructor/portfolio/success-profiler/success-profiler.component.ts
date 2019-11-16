import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
@Component({
  selector: 'app-success-profiler',
  templateUrl: './success-profiler.component.html',
  styleUrls: ['./success-profiler.component.css']
})
export class SuccessProfilerComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Success Profiler & Personal Growth Plan'}));
  }

}
