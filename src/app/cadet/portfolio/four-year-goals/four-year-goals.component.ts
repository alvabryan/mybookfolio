import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebasePortfolioService } from '../service/firebase-portfolio.service';
import { PageTitleService } from '../service/page-title.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-four-year-goals',
  templateUrl: './four-year-goals.component.html',
  styleUrls: ['./four-year-goals.component.css']
})
export class FourYearGoalsComponent implements OnInit, OnDestroy {

  editorForm: FormGroup;

  // used to unsubscribe on destroy
  private goalSubscription: Subscription = new Subscription();

  // goals
  goals: any;

  // style the editor
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

  constructor(private sendPageTitle: PageTitleService, private firebasePortfolio: FirebasePortfolioService) { }

  ngOnInit() {
    // creates a new form group
    this.editorForm = new FormGroup({
      editor: new FormControl('')
    });

    // sends the page title
    this.sendPageTitle.pageTitle.next('Four Year Goals');

    // get goals from firebase portfolio service
    this.goalSubscription.add(
      this.firebasePortfolio.cadetGoals().subscribe(goals => {
        this.goals = goals;
        console.log(goals);
        this.goalSubscription.add(
            this.firebasePortfolio.selectLetLevel.subscribe( letLevel => {
              const letOption = 'let' + letLevel;
              console.log(letOption);
              if ( !this.goals[letOption] ) {
                this.editorForm.controls.editor.setValue('');
                this.firebasePortfolio.lastUpdated.next('');
                console.log('none');
              } else {
                this.editorForm.controls.editor.setValue(this.goals[letOption].goalContent);
                this.firebasePortfolio.lastUpdated.next(this.goals[letOption].dateSubmitted);
              }
            })
          );
      })
    );

  }

  ngOnDestroy() {
    this.goalSubscription.unsubscribe();
  }

  onSubmit() {
    if ( this.editorForm.get('editor').value ) {
      this.firebasePortfolio.setCadetGoals(this.editorForm.get('editor').value);
    } else {
      alert('Your field is blank');
    }
  }

}
