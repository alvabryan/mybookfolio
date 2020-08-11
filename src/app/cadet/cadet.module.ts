import { NgModule } from '@angular/core';

// cadet components
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './page-skeleton/navigation/navigation.component';
import { SidebarComponent } from './page-skeleton/sidebar/sidebar.component';
import { CadetComponent } from './cadet.component';
import { ResumeComponent } from './resume/resume.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RequestComponent } from './request/request.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CadetChallengeComponent } from './cadet-challenge/cadet-challenge.component';
import { SettingsComponent } from './settings/settings.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CardsComponent } from './dashboard/cards/cards.component';
import { CardItmeComponent } from './dashboard/cards/card-itme/card-itme.component';

// module imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadetRoutingModule } from './cadet-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CadetPortfolioComponent } from './cadet-portfolio/cadet-portfolio.component';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { StoreModule } from '@ngrx/store';

import * as fromCadet from './store/index';
import { AuthGuard } from './auth.guard';
import * as CadetEffects from './store/cadet.effects';
import { EffectsModule } from '@ngrx/effects';
import { CadetDataSheetComponent } from './cadet-data-sheet/cadet-data-sheet.component';
import { RemindersComponent } from './reminders/reminders.component';
import { CustomCardsComponent } from './custom-cards/custom-cards.component';
import { CustomCardsViewComponent } from './custom-cards/custom-cards-view/custom-cards-view.component';
import { UploadFileModalComponent } from './custom-cards/custom-cards-view/upload-file-modal/upload-file-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    SidebarComponent,
    CadetComponent,
    ResumeComponent,
    CalendarComponent,
    RequestComponent,
    AnalyticsComponent,
    CadetChallengeComponent,
    SettingsComponent,
    DocumentationComponent,
    CardsComponent,
    CardItmeComponent,
    CadetPortfolioComponent,
    CadetDataSheetComponent,
    RemindersComponent,
    CustomCardsComponent,
    CustomCardsViewComponent,
    UploadFileModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CadetRoutingModule,
    SharedModule,
    QuillModule,
    AngularFirestoreModule,
    PortfolioModule,
    StoreModule.forFeature('cadet', fromCadet.reducers),
    EffectsModule.forFeature([CadetEffects.CadetEffects])
  ],
  providers: [
    AuthGuard
  ]
})

export class CadetModule {}
