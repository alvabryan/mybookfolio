import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profileImage: FormGroup;
  settingForm: FormGroup;
  passwordForm: FormGroup;

  constructor() { }

  ngOnInit() {
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

}
