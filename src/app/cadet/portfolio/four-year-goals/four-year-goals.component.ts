import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-four-year-goals',
  templateUrl: './four-year-goals.component.html',
  styleUrls: ['./four-year-goals.component.css']
})
export class FourYearGoalsComponent implements OnInit {

  editorForm: FormGroup;

  editorStyle = {
    height: '150px'
  };

  constructor() { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.editorForm.get('editor').value);
  }

}
