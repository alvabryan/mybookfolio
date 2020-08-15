import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as cadetCustomCardAction from '../../store/custom-cards.actions';
import * as fromCadet from '../../../store/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.css']
})
export class UploadFileModalComponent implements OnInit {

  @Input() assignmentId: any;

  fileUploadForm: FormGroup;
  fileData: any;
  loading = 'not submitted';
  error: {code: string, name: string};

  constructor(private store: Store<fromCadet.State>) { }

  ngOnInit() {
    this.fileUploadForm = new FormGroup({
      comment: new FormControl(null)
    });
  }

  onFileSelect(attachmentData) {
    this.fileData = attachmentData;
  }

  deleteFile() {
    this.fileData = null;
  }

  onSubmit() {
    this.loading = 'uploading';
    console.log(this.loading);

    this.store.dispatch(cadetCustomCardAction.submitAssignment({submission: {
      file: this.fileData,
      comment: this.fileUploadForm.value.comment,
      assignmentId: this.assignmentId
    }}));

    this.store.select('cadet').subscribe((data) => {
      if (data) {
        if (data.customCards) {
          this.loading = data.customCards.loadingStatus;
        }
      }
    });
  }

  changeLoadingStatus() {
    this.fileData = null;
    this.fileUploadForm.reset();
    setTimeout(() => {
      this.loading = 'not submitted';
      this.store.dispatch(cadetCustomCardAction.resetUploadFileStatus());
    }, 1000);
  }

}
