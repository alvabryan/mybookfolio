import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../instructor/store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal-ad',
  templateUrl: './personal-ad.component.html',
  styleUrls: ['./personal-ad.component.css']
})
export class PersonalAdComponent implements OnInit, OnDestroy {

  cadetData = '';
  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if (data.viewData && data.pageName === 'Personal Ad') {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          this.cadetData = data.viewData[letLevel] ? data.viewData[letLevel].content : null;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
