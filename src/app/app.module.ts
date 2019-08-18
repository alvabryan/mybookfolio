import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// environmnet import
import { environment } from 'src/environments/environment';

// form modules
import { FormsModule } from '@angular/forms';

// flash message models
import { FlashMessagesModule } from 'angular2-flash-messages';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules
import { CadetModule } from './cadet/cadet.module';
import { HomepageModuel } from './homepage/homepage.module';
import { SharedModule } from './shared/shared.module';



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
    FlashMessagesModule.forRoot(),
    CadetModule,
    HomepageModuel,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
