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
import { AnalyticsComponent } from './analytics/analytics.component';
import { CadetDataRequestComponent } from './cadet-data-request/cadet-data-request.component';
import { CadetChallengeComponent } from './cadet-challenge/cadet-challenge.component';
import { BattalionUsersComponent } from './battalion-users/battalion-users.component';
import { SupportComponent } from './support/support.component';
import { SettingsComponent } from './settings/settings.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { MyCadetsComponent } from './cadets/my-cadets/my-cadets.component';
import { BattalionRosterComponent } from './cadets/battalion-roster/battalion-roster.component';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';
import { FourYearGoalsComponent } from './portfolio/four-year-goals/four-year-goals.component';
import { WinningColorsComponent } from './portfolio/winning-colors/winning-colors.component';
import { LearningStyleComponent } from './portfolio/learning-style/learning-style.component';
import { PersonalAdComponent } from './portfolio/personal-ad/personal-ad.component';
import { HumanGraphComponent } from './portfolio/human-graph/human-graph.component';
import { FinancialPlanningComponent } from './portfolio/financial-planning/financial-planning.component';
import { CourseWorkComponent } from './portfolio/course-work/course-work.component';
import { PortfolioCadetChallengeComponent } from './portfolio/portfolio-cadet-challenge/portfolio-cadet-challenge.component';
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
import * as PortfolioEffects from './portfolio/store/portolio.effects';
import * as BattalionUsersEffect from './battalion-users/store/battalion-users.effects';

@NgModule({
  declarations: [
    InstructorComponent,
    NavigationComponent,
    SidebarComponent,
    DashboardComponent,
    CardsComponent,
    CardItemComponent,
    CadetsComponent,
    AnalyticsComponent,
    CadetDataRequestComponent,
    CadetChallengeComponent,
    BattalionUsersComponent,
    SupportComponent,
    SettingsComponent,
    DocumentationComponent,
    PortfolioComponent,
    MyCadetsComponent,
    BattalionRosterComponent,
    PortfolioViewComponent,
    FourYearGoalsComponent,
    WinningColorsComponent,
    LearningStyleComponent,
    PersonalAdComponent,
    HumanGraphComponent,
    FinancialPlanningComponent,
    CourseWorkComponent,
    PortfolioCadetChallengeComponent,
    CadetPortfolioComponent,
    CadetPortfolioViewComponent,
    CadetInformationComponent
  ],
  imports: [
    CommonModule,
    InstructorRouting,
    SharedModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    StoreModule.forFeature('instructor', InstructorIndex.reducers),
    EffectsModule.forFeature([InstructorEffects.InstructorEffects, PortfolioEffects.PortfolioEffects, BattalionUsersEffect.BattalionUsersEFfect]),
    NgxDocViewerModule
  ],
  exports: [],
  providers: [],
})


export class InstructorModule {}
