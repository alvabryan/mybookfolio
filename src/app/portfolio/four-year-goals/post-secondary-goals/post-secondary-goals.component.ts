import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-secondary-goals',
  templateUrl: './post-secondary-goals.component.html',
  styleUrls: ['./post-secondary-goals.component.css']
})
export class PostSecondaryGoalsComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    this.postSecondaryGoals = new FormGroup({
      postGoals: new FormControl('test')
    });
  }

  onSumbit() {
    console.log(this.postSecondaryGoals.value);
  }

}
