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
import { SuccessProfilerComponent } from './portfolio/success-profiler/success-profiler.component';
import { LearningStyleComponent } from './portfolio/learning-style/learning-style.component';
import { PersonalAdComponent } from './portfolio/personal-ad/personal-ad.component';
import { HumanGraphComponent } from './portfolio/human-graph/human-graph.component';
import { PortfolioResumeComponent } from './portfolio/portfolio-resume/portfolio-resume.component';
import { FinancialPlanningComponent } from './portfolio/financial-planning/financial-planning.component';
import { CourseWorkComponent } from './portfolio/course-work/course-work.component';
import { EssayComponent } from './portfolio/essay/essay.component';
import { LessonEvidenceComponent } from './portfolio/lesson-evidence/lesson-evidence.component';
import { WrittenSummaryComponent } from './portfolio/written-summary/written-summary.component';
import { AchievementsComponent } from './portfolio/achievements/achievements.component';
import { PortfolioCadetChallengeComponent } from './portfolio/portfolio-cadet-challenge/portfolio-cadet-challenge.component';
import { ServiceLearningComponent } from './portfolio/service-learning/service-learning.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CadetPortfolioComponent } from './cadet-portfolio/cadet-portfolio.component';
import { CadetPortfolioViewComponent } from './cadet-portfolio/cadet-portfolio-view/cadet-portfolio-view.component';
import { CadetInformationComponent } from './cadet-portfolio/cadet-information/cadet-information.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

//ngrx
import { StoreModule } from '@ngrx/store';
import * as InstructorIndex from './store/index';
import { EffectsModule } from '@ngrx/effects';
import * as InstructorEffects from './store/instructor.effects';
import * as PortfolioEffects from './portfolio/store/portolio.effects';
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
    SuccessProfilerComponent,
    LearningStyleComponent,
    PersonalAdComponent,
    HumanGraphComponent,
    PortfolioResumeComponent,
    FinancialPlanningComponent,
    CourseWorkComponent,
    EssayComponent,
    LessonEvidenceComponent,
    WrittenSummaryComponent,
    AchievementsComponent,
    PortfolioCadetChallengeComponent,
    ServiceLearningComponent,
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
    StoreModule.forFeature('instructor',InstructorIndex.reducers),
    EffectsModule.forFeature([InstructorEffects.InstructorEffects, PortfolioEffects.PortfolioEffects])
  ],
  exports: [],
  providers: [],
})


export class InstructorModule {}
