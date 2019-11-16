import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as InstructorActions from '../store/instructor.actions';

@Component({
  selector: 'app-cadets',
  templateUrl: './cadets.component.html',
  styleUrls: ['./cadets.component.css']
})
export class CadetsComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {

  }

}
