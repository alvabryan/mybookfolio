import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { InstructorService } from '../instructor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  subscription: Subscription = new Subscription();

  instructorData: any;

  profileImage: FormGroup;
  settingForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private afAuth: AngularFireAuth, private instructorService: InstructorService) { }

  ngOnInit() {
    this.instructorService.instructorData.subscribe(data => {
      this.instructorData = data;
      console.log(this.instructorData);
    });

    this.profileImage = new FormGroup({
      file: new FormControl('')
    });

    this.settingForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(''),
      newPassword: new FormControl('')
    });
  }



  // profile image upload
  image: any;
  uploadProgress: any;
  uploadState: any;
  downloadUrl: any;

  uploadProfileImage(image){

    // creates random string 
    const path = `instructorProfileImage/${Date.now()}_${image.target.files[0].name}`;

    // reference
    const ref = this.storage.ref(path);

    // image your going to upload
    this.image = this.storage.upload(path, image.target.files[0]);

    // upload proccess
    this.uploadProgress = this.image.percentageChanges();

    // final
    this.uploadState = this.image.snapshotChanges().pipe(finalize(async() => {
      this.downloadUrl = await ref.getDownloadURL().toPromise();
      this.afAuth.auth.currentUser.updateProfile({
        photoURL: this.downloadUrl
      })
    })).subscribe((data)=> {
      console.log(data);
    });
    

    
  }

}
