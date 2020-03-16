import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../../store/index';
import * as PortfolioActions from '../../store/portfolio.actions';

@Component({
  selector: 'app-post-secondary-goals',
  templateUrl: './post-secondary-goals.component.html',
  styleUrls: ['./post-secondary-goals.component.css']
})
export class PostSecondaryGoalsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

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

  postSecondaryGoals: FormGroup;

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {
    this.postSecondaryGoals = new FormGroup({
      postGoals: new FormControl('')
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          const goalContent = data.viewData[letLevel] ? data.viewData[letLevel].postSecondaryGoals : null;
          const fourYearGoalsContent = goalContent ? goalContent.content : null;
          this.postSecondaryGoals.setValue({
            postGoals: fourYearGoalsContent
          });
        } else {
          this.postSecondaryGoals.reset();
        }
      })
    );
  }

  onSumbit() {
    const formData = this.postSecondaryGoals.value;
    this.store.dispatch(PortfolioActions.postSecondaryGoalsUpdate({postSecondaryGoals: formData}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
