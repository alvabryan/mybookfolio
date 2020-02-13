import { NgModule } from '@angular/core';

import { ErrorPageComponent } from './error-page/error-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorPageComponent,
    SettingsComponent
  ],
  exports: [
    SpinnerComponent,
    ErrorPageComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ]
})


export class SharedModule {}
