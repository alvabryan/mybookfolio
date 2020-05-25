import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRouting } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { NavigationComponent } from './page-skeleton/navigation/navigation.component';
import { SidebarComponent } from './page-skeleton/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './dashboard/cards/cards.component';
import { CardItemComponent } from './dashboard/cards/card-item/card-item.component';
import { CadetsComponent } from './cadets/cadets.component';
import { CadetDataRequestComponent } from './cadet-data-request/cadet-data-request.component';
import { BattalionUsersComponent } from './battalion-users/battalion-users.component';
import { SupportComponent } from './support/support.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CadetPortfolioComponent } from './cadet-portfolio/cadet-portfolio.component';
import { CadetPortfolioViewComponent } from './cadet-portfolio/cadet-portfolio-view/cadet-portfolio-view.component';
import { CadetInformationComponent } from './cadet-portfolio/cadet-information/cadet-information.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxDocViewerModule } from 'node_modules/ngx-doc-viewer';

// ngrx
import { StoreModule } from '@ngrx/store';
import * as InstructorIndex from './store/index';
import { EffectsModule } from '@ngrx/effects';
import * as InstructorEffects from './store/instructor.effects';
import * as RemainderEffects from './reminders/store/remainders.effects';
import * as BattalionUsersEffect from './battalion-users/store/battalion-users.effects';
import { SettingInstructorComponent } from './setting-instructor/setting-instructor.component';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { InstructorPortfolioComponent } from './instructor-portfolio/instructor-portfolio.component';
import { AuthInstructor } from './auth-instructor.guard';
import * as SearchCadetEffects from './cadets/store-searchcadet/searchCadet.effects';
import { AuthAprovelComponent } from './auth-aprovel/auth-aprovel.component';
import { RemindersComponent } from './reminders/reminders.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    InstructorComponent,
    NavigationComponent,
    SidebarComponent,
    DashboardComponent,
    CardsComponent,
    CardItemComponent,
    CadetsComponent,
    CadetDataRequestComponent,
    BattalionUsersComponent,
    SupportComponent,
    DocumentationComponent,
    PortfolioViewComponent,
    CadetPortfolioComponent,
    CadetPortfolioViewComponent,
    CadetInformationComponent,
    SettingInstructorComponent,
    InstructorPortfolioComponent,
    AuthAprovelComponent,
    RemindersComponent
  ],
  imports: [
    CommonModule,
    InstructorRouting,
    SharedModule,
    QuillModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    StoreModule.forFeature('instructor', InstructorIndex.reducers),
    EffectsModule.forFeature([InstructorEffects.InstructorEffects, BattalionUsersEffect.BattalionUsersEFfect, SearchCadetEffects.SearchCadetEffects,  RemainderEffects.RemindersEffect]),
    NgxDocViewerModule,
    PortfolioModule
  ],
  exports: [],
  providers: [AuthInstructor],
})


export class InstructorModule {}
