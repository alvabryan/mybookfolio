import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromCadet from '../store/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as AuthActions from '../../auth/store/auth.actions';

type NewType = boolean;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  uploadingImage: NewType = false;
  cadetData: any;

  profileImage: FormGroup;
  personalInfo: FormGroup;
  battalionCode: FormGroup;
  passwordForm: FormGroup;

  updatingPasswordStatus = false;

  constructor(private store: Store<fromCadet.State>) { }

  ngOnInit() {

    this.profileImage = new FormGroup({
      file: new FormControl('')
    });

    this.personalInfo = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      letLevel: new FormControl(''),
      period: new FormControl('')
    });

    this.battalionCode = new FormGroup({
      code: new FormControl('', Validators.required)
    });

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    });


    this.store.select('cadet').subscribe((data: any) => {
      this.cadetData = data.cadetData;

      if (data.cadetData) {
        this.personalInfo.setValue({
          firstName: data ? data.cadetData.firstName : null,
          lastName: data ? data.cadetData.lastName : null,
          letLevel: data ? data.cadetData.letLevel : null,
          period: data ? data.cadetData.period : null
        });

        this.battalionCode.setValue({
          code: data ? data.cadetData.battalionCode : null
        });
      }

    });

  }

  // get personal info form controls
  get firstName() { return this.personalInfo.get('firstName'); }
  get lastName() { return this.personalInfo.get('lastName'); }

  // get battalion code form controls
  get code() { return this.battalionCode.get('code'); }

  // get password form control names
  get currentPassord() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }

  uploadProfileImage(imageData: any) {
    this.uploadingImage = true;

    this.store.dispatch(AuthActions.imageUpload({image: imageData}));

    this.profileImage.reset();

    this.store.select('auth').subscribe(data => {
      if (!data.uploadingProfileImage) {
        this.uploadingImage = data.uploadingProfileImage;
      }
    });
  }

  onBattalionCodeSubmit() {
    const battalionCode = this.battalionCode.value;
    this.store.dispatch(AuthActions.updateBattalionCode({newBattalionCode: battalionCode}));
  }

  onSubmitPersonalInfo() {
    const newCadetData = this.personalInfo.value;
    this.store.dispatch(AuthActions.updateCadetInfo({newPersonalData: newCadetData}));
  }

  onSubmitPassword() {
    const oldPassword = this.passwordForm.value.currentPassword;
    const newPassword = this.passwordForm.value.newPassword;

    this.store.dispatch(AuthActions.passwordUpdate({oldPassword, newPassword}));
    this.store.dispatch(AuthActions.passwordUpdateStatus({status: 'loading'}));

    this.store.select('auth').subscribe(data => {
      if (data.passwordUpdateStatus === 'loading') {
        this.updatingPasswordStatus = true;
      } else if (data.passwordUpdateStatus === 'error' || data.passwordUpdateStatus === 'success') {
        this.updatingPasswordStatus = false;
        if (data.passwordUpdateStatus === 'error') {
          alert('Error: Your current password is incorrect!');
        } else {
          this.passwordForm.reset();
        }
      }
    });
  }

}
