import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
@Component({
  selector: 'app-service-learning',
  templateUrl: './service-learning.component.html',
  styleUrls: ['./service-learning.component.css']
})
export class ServiceLearningComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Service Learning'}));
  }

}
