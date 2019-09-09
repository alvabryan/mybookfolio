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
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FourYearGoalsComponent } from './portfolio/four-year-goals/four-year-goals.component';
import { WinningColorsComponent } from './portfolio/winning-colors/winning-colors.component';
import { SuccessProfilerComponent } from './portfolio/success-profiler/success-profiler.component';
import { LearningStyleComponent } from './portfolio/learning-style/learning-style.component';
import { PersonalAdComponent } from './portfolio/personal-ad/personal-ad.component';
import { HumanGraphComponent } from './portfolio/human-graph/human-graph.component';
import { FinancialPlanningComponent } from './portfolio/financial-planning/financial-planning.component';
import { CourseWorkComponent } from './portfolio/course-work/course-work.component';
import { EssayComponent } from './portfolio/essay/essay.component';
import { LessonEvidenceComponent } from './portfolio/lesson-evidence/lesson-evidence.component';
import { WrittenSummaryComponent } from './portfolio/written-summary/written-summary.component';
import { AchievementsComponent } from './portfolio/achievements/achievements.component';
import { ServiceLearningComponent } from './portfolio/service-learning/service-learning.component';
import { PortfolioResumeComponent } from './portfolio/portfolio-resume/portfolio-resume.component';
import { PortfolioCadetChallengeComponent } from './portfolio/portfolio-cadet-challenge/cadet-challenge.component';

// module imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadetRoutingModule } from './cadet-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { AngularFirestoreModule } from '@angular/fire/firestore';


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
    PortfolioComponent,
    FourYearGoalsComponent,
    WinningColorsComponent,
    SuccessProfilerComponent,
    LearningStyleComponent,
    PersonalAdComponent,
    HumanGraphComponent,
    FinancialPlanningComponent,
    CourseWorkComponent,
    EssayComponent,
    LessonEvidenceComponent,
    WrittenSummaryComponent,
    AchievementsComponent,
    ServiceLearningComponent,
    PortfolioResumeComponent,
    PortfolioCadetChallengeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CadetRoutingModule,
    SharedModule,
    QuillModule,
    AngularFirestoreModule
  ]
})

export class CadetModule {}
