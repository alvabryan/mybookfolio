import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CadetPortfolioService } from '../cadet-portfolio.service';
import { Subscription, EMPTY, of, from } from 'rxjs';
import { take, mergeMap, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-four-year-goals',
  templateUrl: './four-year-goals.component.html',
  styleUrls: ['./four-year-goals.component.css']
})
export class FourYearGoalsComponent implements OnInit, OnDestroy {
  editorStyle = {
    height: '150px'
  };

  // editor options
  editorOptions = {
    toolbar: [
      // toggled buttons
      ['bold', 'italic', 'underline', 'strike'],
      // custom button values
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered'}, { list: 'bullet' }],
      // superscript/subscript
      [{ script: 'sub'}, { script: 'super' }],
      // headings
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // remove formatting button
      ['clean'],
      // link and image, video
      ['link']
    ]
  };

  subscription: Subscription = new Subscription();
  editorForm: FormGroup;

  cadetData: any;

  constructor(
    private db: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Four Year Goals'}));

    // creates a new form group
    this.editorForm = new FormGroup({
      editor: new FormControl('')
    });

    this.subscription.add(
      this.store.select('instructor').subscribe(data => {
        if (data.portfolio.viewData) {
          const letLevel = 'let' + data.portfolio.cadetSearchData.letLevel;
          if (data.portfolio.viewData[letLevel].content) {
            this.editorForm.setValue({
              editor: data.portfolio.viewData[letLevel].content
            });
          }
        }
      })
    );
  }

  onSubmit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.store.dispatch(PortfolioActions.clearCadetPortfolioViewData());
  }

}
