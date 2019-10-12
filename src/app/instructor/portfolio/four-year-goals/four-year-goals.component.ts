import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CadetPortfolioService } from '../cadet-portfolio.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-four-year-goals',
  templateUrl: './four-year-goals.component.html',
  styleUrls: ['./four-year-goals.component.css']
})
export class FourYearGoalsComponent implements OnInit {

  subscription: Subscription = new Subscription();
  editorForm: FormGroup;

  constructor(private cadetPortfolioService: CadetPortfolioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // creates a new form group
    this.editorForm = new FormGroup({
      editor: new FormControl('')
    });

    

    
  }

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

  onSubmit(){

  }

}
