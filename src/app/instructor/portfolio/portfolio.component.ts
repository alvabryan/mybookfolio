import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as PortfolioActions from './store/portfolio.actions';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  portfolioViewSelect: FormGroup;

  cadetData: any = {};
  cadetViewData: any = {};
  pageName: any;
  lastUpdated: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private router: Router) { }

  ngOnInit() {

    this.lastUpdated = null;

    this.portfolioViewSelect = new FormGroup({
      pageViewName: new FormControl('')
    })

    this.subscription.add(
      this.store.select('instructor').subscribe((data:any) => {
        if(data.portfolio){

          if(data.portfolio.pageName){
            this.pageName = data.portfolio.pageName;
            this.setPortfolioViewForm();
          }

          
          const cadetData =  data.portfolio.cadetSearchData;
          this.cadetData = cadetData;

          const letLevel = 'let' + cadetData.letLevel;

          if(data.portfolio.viewData){
            this.cadetViewData = data.portfolio.viewData;
            if(data.portfolio.viewData[letLevel].dateSubmitted){
              this.lastUpdated = data.portfolio.viewData[letLevel].dateSubmitted;
            }
          }

          
        }
      })
    )
  }

  setPortfolioViewForm(){
    this.portfolioViewSelect.setValue({
      pageViewName: this.pageName
    })
  }

  setLetLevel(newLet){
    this.store.dispatch(PortfolioActions.updateCadetSearchLetLevel({letLevel: newLet}));
  }

  changePortfolioView(){
    const pageName = this.portfolioViewSelect.value.pageViewName;
    switch(pageName){
      case 'Four Year Goals':
          this.router.navigate(['instructor/portfolio/four-year-goals']);
      break;
      case 'Winning Colors':
          this.router.navigate(['instructor/portfolio/winning-colors']);
      break;
      default:
        console.log('error');
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
