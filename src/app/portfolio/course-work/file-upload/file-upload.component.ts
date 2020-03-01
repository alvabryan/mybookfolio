import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../../store/index';
import * as PortfolioActions from '../../store/portfolio.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  fileUploadForm: FormGroup;
  fileData: any;
  loading = 'not submitted';

  constructor(private store: Store<fromPortfolio.PortfolioState>) { }

  ngOnInit() {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl(null),
      description: new FormControl(null)
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
    const formData = this.fileUploadForm.value;
    this.store.dispatch(PortfolioActions.uploadFile({
      fileName: formData.fileName,
      file: this.fileData,
      description: formData.description
    }));

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        this.loading = data.uploading;
      })
    );

  }

  changeLoadingStatus() {
    this.fileData = null;
    this.fileUploadForm.reset();
    setTimeout(() => {
      this.loading = 'not submitted';
      this.store.dispatch(PortfolioActions.resetUploadFileStatus());
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
