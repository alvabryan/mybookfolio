import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

}
