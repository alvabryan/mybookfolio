import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-success-profiler',
  templateUrl: './success-profiler.component.html',
  styleUrls: ['./success-profiler.component.css']
})
export class SuccessProfilerComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>, private router: Router) { }

  cadetData: Array<any> = [];
  cadetViewData: any;

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Success Profiler'}));

    this.store.select('instructor').subscribe(data => {
      if(data.portfolio.viewData){
        const letLevel = 'let' + data.portfolio.cadetSearchData.letLevel;
        if(data.portfolio.viewData[letLevel]){
          const cadetData = data.portfolio.viewData[letLevel].successContent;
          this.cadetData = cadetData;
        }
      }
    })
  }

  showModel(fileIndex: number){
    this.cadetViewData = this.cadetData[fileIndex];
  }

}
