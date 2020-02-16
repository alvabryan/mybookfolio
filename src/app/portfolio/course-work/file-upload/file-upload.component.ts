import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  loading = false;
  isModalShow = false;

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

  onSubmit() {
    this.loading = true;
    const formData = this.fileUploadForm.value;
    this.store.dispatch(PortfolioActions.uploadFile({
      fileName: formData.fileName,
      file: this.fileData,
      description: formData.description
    }));

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        this.loading = data.uploading;
        this.isModalShow = true;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
