import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../../instructor/store/index';
import * as AuthActions from '../../auth/store/auth.actions';
import { Router } from '@angular/router';

type NewType = boolean;
@Component({
  selector: 'app-setting-instructor',
  templateUrl: './setting-instructor.component.html',
  styleUrls: ['./setting-instructor.component.css']
})
export class SettingInstructorComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  instructorData: any;

  profileImage: FormGroup;
  settingForm: FormGroup;
  passwordForm: FormGroup;

  uploadingImage: NewType = false;
  updatingPasswordStatus: NewType = false;

  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<fromInstructor.State>
    ) { }

  ngOnInit() {
    this.profileImage = new FormGroup({
      file: new FormControl('')
    });

    this.settingForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });

    this.passwordForm = new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl('')
    });

    this.subscription.add(
      this.store.select('auth').subscribe((data: any) => {
        this.instructorData = data.user;
        if (this.instructorData) {
          this.settingForm.patchValue({
            firstName: this.instructorData.firstName,
            lastName: this.instructorData.lastName
          });
        }
      })
    );
  }

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

  updateSettings() {
    this.store.dispatch(AuthActions.updateUserInfo(this.settingForm.value));
  }

  updatePassword() {
    const oldPassword = this.passwordForm.value.oldPassword;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
