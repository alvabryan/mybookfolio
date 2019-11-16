import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-course-work',
  templateUrl: './course-work.component.html',
  styleUrls: ['./course-work.component.css']
})
export class CourseWorkComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Course Work'}));
  }

}
