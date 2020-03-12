import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
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
    private store: Store<fromPortfolio.State>) { }

  ngOnInit() {

    // creates a new form group
    this.editorForm = new FormGroup({
      editor: new FormControl('')
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          const goalContent = data.viewData[letLevel] ? data.viewData[letLevel].fourYearGoals : null;
          const fourYearGoalsContent = goalContent ? goalContent.content : null;
          this.editorForm.setValue({
            editor: fourYearGoalsContent
          });
        } else {
          this.editorForm.setValue({
            editor: ''
          });
        }
      })
    );
  }

  onSubmit() {
    const goalsData = this.editorForm.value;
    this.store.dispatch(PortfolioActions.fourYearGoalsUpdate({yearlyGoals: goalsData}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
