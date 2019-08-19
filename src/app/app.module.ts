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
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
