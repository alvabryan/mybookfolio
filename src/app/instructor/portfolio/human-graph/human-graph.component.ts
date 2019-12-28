import { Component, OnInit } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-human-graph',
  templateUrl: './human-graph.component.html',
  styleUrls: ['./human-graph.component.css']
})
export class HumanGraphComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Human Graph'}));
  }

}
