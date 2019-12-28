import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// environmnet import
import { environment } from 'src/environments/environment';

// form modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// flash message models
import { FlashMessagesModule } from 'angular2-flash-messages';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules
import { SharedModule } from './shared/shared.module';

// Quil module
import { QuillModule } from 'ngx-quill';

// ngrx dev tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ngrx store
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/index';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

// meta reducer
import * as logoutMetaReducer from './store/logout-reducer/logout.reducer';
import * as logoutEffects from './store/logout-reducer/logout.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    SharedModule,
    HttpClientModule,
    QuillModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers: [logoutMetaReducer.clearState]}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production
    }),
    EffectsModule.forRoot([logoutEffects.LogoutEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
