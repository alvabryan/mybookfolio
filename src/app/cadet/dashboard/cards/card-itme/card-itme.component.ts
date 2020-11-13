import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// ngrx
import { mergeMap, tap } from 'rxjs/operators';
import * as fromRoot from '../../../../store/index';
import * as PortfolioActions from '../../../../portfolio/store/portfolio.actions';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-card-itme',
  templateUrl: './card-itme.component.html',
  styleUrls: ['./card-itme.component.css']
})
export class CardItmeComponent implements OnInit {
  @Input() card: {name: string, url: string, imageUrl: string, progress: string};

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit() {

  }

  onSetCard(cardName) {
    this.store.select('auth').subscribe((data: any) => {
      const userData = data.user;
      if (userData) {
        this.store.dispatch(PortfolioActions.searchCadet({
          uid: userData.uid,
          firstName: userData.firstName,
          lastName: userData.lastName,
          letLevel: userData.letAssigned,
          period: userData.period
        }));
      }
    });

    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: cardName}));
    this.router.navigate(['/cadet/portfolio']);
  }

}

