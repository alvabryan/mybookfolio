import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

//ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  cadetData = {};
  pageName = '';

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.subscription.add(
      this.store.select('instructor').subscribe(data => {
        this.cadetData = data.portfolio.cadetSearchData;
        this.pageName = data.portfolio.pageName;
        console.log(this.cadetData);
      })
    );
  }


  setLetLevel(letLevel){
    console.log(letLevel);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
