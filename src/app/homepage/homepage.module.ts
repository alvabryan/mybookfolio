import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// homepage components
import { HomepageComponent } from './homepage.component';
import { HomepageRouting } from './homepage-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomepageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomepageRouting,
    FlashMessagesModule,
    SharedModule
  ]
})
export class HomepageModuel {}
