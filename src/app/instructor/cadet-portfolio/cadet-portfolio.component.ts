import { Component, OnInit } from '@angular/core';

//ngrx
import * as fromRoot from '../store/index';
import * as InstructorActions from '../store/instructor.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cadet-portfolio',
  templateUrl: './cadet-portfolio.component.html',
  styleUrls: ['./cadet-portfolio.component.css']
})
export class CadetPortfolioComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {

  }

}
