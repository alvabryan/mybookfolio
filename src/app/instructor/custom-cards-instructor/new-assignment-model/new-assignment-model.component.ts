import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../../store/index';
import * as customCardAction from '../store/custom-cards.actions';

@Component({
  selector: 'app-new-assignment-model',
  templateUrl: './new-assignment-model.component.html',
  styleUrls: ['./new-assignment-model.component.css']
})
export class NewAssignmentModelComponent implements OnInit {

  assignmentForm: FormGroup;
  fileData: any;
  loading = 'not submitted';

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.assignmentForm = new FormGroup({
      assignmentName: new FormControl(''),
      link: new FormControl(''),
      instructions: new FormControl(''),
      showAssignment: new FormControl('true')
    });
  }

  onFileSelect(uploadFileData) {
    this.fileData = uploadFileData;
  }

  deleteCurrentUploadFile() {
    this.fileData = null;
  }

  onSubmit() {
    this.loading = 'uploading';
    const newAssignmentData = {...this.assignmentForm.value, fileData: this.fileData};
    this.store.dispatch(customCardAction.createAssignment({newAssignment: newAssignmentData}));
  }



}
