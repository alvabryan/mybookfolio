import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.css']
})
export class UploadFileModalComponent implements OnInit {

  fileUploadForm: FormGroup;
  fileData: any;
  loading = 'not submitted';
  error: {code: string, name: string};

  constructor() { }

  ngOnInit() {
    this.fileUploadForm = new FormGroup({
      description: new FormControl(null)
    });
  }

  onSubmit() {

  }

  changeLoadingStatus() {

  }

}
