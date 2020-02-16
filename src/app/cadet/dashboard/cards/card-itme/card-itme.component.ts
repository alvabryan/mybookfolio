import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// ngrx
import * as fromCadet from '../../../store/index';
import * as fromRoot from '../../../../store/index';
import * as PortfolioActions from '../../../../portfolio/store/portfolio.actions';
import { Store } from '@ngrx/store';

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
    this.store.dispatch(PortfolioActions.searchCadet({
      uid: 'oCoeGDow4TUspZWRoBzfTQJ7otz1',
      firstName: 'Jairo',
      lastName: 'Alvarenga',
      letLevel: 3
    }));
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: cardName}));
    this.router.navigate(['/cadet/portfolio']);
  }

}

