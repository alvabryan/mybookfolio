import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { InstructorService } from '../instructor.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../store/index';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  instructorData: any;

  profileImage: FormGroup;
  settingForm: FormGroup;
  passwordForm: FormGroup;

  uploadingImage: boolean = true;
  updatingPasswordStatus: boolean = false;

  constructor(
    private storage: AngularFireStorage, 
    private db: AngularFirestore, 
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
        if(this.instructorData){
          this.settingForm.patchValue({
            firstName: this.instructorData.firstName,
            lastName: this.instructorData.lastName
          })
        }


        this.uploadingImage = data.profileImageUpload;
      })
    )
  }



  // profile image upload
  image: any;
  uploadProgress: any;
  uploadProgressData = false;
  uploadState: any;
  downloadUrl: any;

  uploadProfileImage(image){

    this.store.dispatch(AuthActions.imageUploadLoading());

    // creates random string 
    const path = `instructorProfileImage/${Date.now()}_${image.target.files[0].name}`;

    // reference
    const ref = this.storage.ref(path);

    // image your going to upload
    this.image = this.storage.upload(path, image.target.files[0]);

    // upload proccess
    this.uploadProgress = this.image.percentageChanges();
    
    // final
    this.uploadState = this.image.snapshotChanges().subscribe(data => console.log(data));

    this.image.then(()=>{
      ref.getDownloadURL().subscribe(url => {
        this.downloadUrl = url;
        this.store.dispatch(AuthActions.changeProfileImage({imageUrl: url}));
      })
    })
  }

  updateSettings(){
    this.store.dispatch(AuthActions.updateUserInfo(this.settingForm.value));
  }

  updatePassword(){
    const oldPassword = this.passwordForm.value.oldPassword;
    const newPassword = this.passwordForm.value.newPassword;
   
    this.store.dispatch(AuthActions.passwordUpdate({oldPassword: oldPassword, newPassword: newPassword}));
    this.store.dispatch(AuthActions.passwordUpdateStatus({status: 'loading'}));

    this.store.select('auth').subscribe(data => {
      if(data.passwordUpdateStatus == 'loading'){
        this.updatingPasswordStatus = true;
      } else if(data.passwordUpdateStatus === 'error' || data.passwordUpdateStatus === 'success'){
        this.updatingPasswordStatus = false;
        if(data.passwordUpdateStatus === 'error'){
          alert('Error: Your current password is incorrect!');
        }else{
          this.passwordForm.reset();
        }
      }
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
