import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileUploadForm: FormGroup;
  fileData: any;

  constructor() { }

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
    console.log(this.fileUploadForm.value);
    console.log(this.fileData);
  }

}
