import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { InstructorRegistrationComponent } from './register/instructor-registration/instructor-registration.component';
import { CadetRegistrationComponent } from './register/cadet-registration/cadet-registration.component';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'password-reset', component: ResetPasswordComponent}
  ]}
];

// ngrx
import * as fromAuth from './store/auth.reducer';
import * as fromAuthEffects from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BattalionRegistrationComponent } from './register/instructor-registration/battalion-registration/battalion-registration.component';
import { BattalionInstructorRegistrationComponent } from './register/instructor-registration/battalion-instructor-registration/battalion-instructor-registration.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    InstructorRegistrationComponent,
    CadetRegistrationComponent,
    BattalionRegistrationComponent,
    BattalionInstructorRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FlashMessagesModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([fromAuthEffects.AuthEffects])
  ]
})
export class AuthModule { }
