import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../../store/index';
import * as customCardAction from '../store/custom-cards.actions';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-new-assignment-model',
  templateUrl: './new-assignment-model.component.html',
  styleUrls: ['./new-assignment-model.component.css']
})
export class NewAssignmentModelComponent implements OnInit, OnDestroy {
  @Input() updateData: {
    type: string,
    assignmentId: string,
    assignmentData: any
  };

  modelTitle: any;

  // edit model variables
  editFileData = {
    fileData: null,
    removed: false
  };

  subscription: Subscription = new Subscription();
  assignmentForm: FormGroup;
  fileData: any;
  loading = 'not submitted';

  constructor(private store: Store<fromInstructor.State>) {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  ngOnInit() {
    this.assignmentForm = new FormGroup({
      assignmentName: new FormControl(''),
      link: new FormControl(''),
      instructions: new FormControl(''),
      showAssignment: new FormControl('true')
    });

    if (this.updateData.type === 'edit') {
      this.modelTitle = 'Edit';
      this.assignmentForm.setValue({
        assignmentName: this.updateData.assignmentData.name ? this.updateData.assignmentData.name : '',
        link: this.updateData.assignmentData.urlLink ? this.updateData.assignmentData.urlLink : '',
        instructions: this.updateData.assignmentData.description ? this.updateData.assignmentData.description : '',
        showAssignment: this.updateData.assignmentData.showCard ? this.updateData.assignmentData.showCard : true
      });
      this.editFileData.fileData = this.updateData.assignmentData.attachment ? this.updateData.assignmentData.attachment.url : null;
    } else {
      this.modelTitle = 'New';
    }
  }

  removeEditAttachment() {
    this.editFileData.removed = true;
  }

  onFileSelect(uploadFileData) {
    this.fileData = uploadFileData;
  }

  deleteCurrentUploadFile() {
    this.fileData = null;
  }

  onSubmit() {
    if (this.updateData.type !== 'edit') {
      this.loading = 'uploading';
      const newAssignmentData = {...this.assignmentForm.value, fileData: this.fileData};
      this.store.dispatch(customCardAction.createAssignment({newAssignment: newAssignmentData}));
      console.log(newAssignmentData);
    } else {
      this.loading = 'uploading';
      const editAssignmentData = {
        ...this.assignmentForm.value,
        fileData: {
          oldFileData: this.editFileData.removed ? this.editFileData.fileData : null,
          newFileData: this.fileData ? this.fileData : null
        },
        assignmentId: this.updateData.assignmentId
      };

      this.store.dispatch(customCardAction.editAssignment({editAssignment: editAssignmentData}));
    }

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if (data.customCards) {
          if (data.customCards.uploadingStatus) {
            this.loading = data.customCards.uploadingStatus;
          }
        }
      })
    );

  }

  changeLoadingStatus() {
    if (this.updateData.type !== 'edit') {
      this.fileData = null;
      this.assignmentForm.reset();
      setTimeout(() => {
        this.loading = 'not submitted';
        this.store.dispatch(customCardAction.resetUploadFileStatus());
      }, 1000);
    } else {
      setTimeout(() => {
        this.loading = 'not submitted';
        this.store.dispatch(customCardAction.resetUploadFileStatus());
      }, 1000);
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
