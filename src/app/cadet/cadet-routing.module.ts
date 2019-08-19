import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

// cadet components
import { CadetComponent } from './cadet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeComponent } from './resume/resume.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RequestComponent } from './request/request.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CadetChallengeComponent } from './cadet-challenge/cadet-challenge.component';
import { SettingsComponent } from './settings/settings.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
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
import { ServiceLearningComponent } from './portfolio/service-learning/service-learning.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { PortfolioCadetChallengeComponent } from './portfolio/portfolio-cadet-challenge/cadet-challenge.component';

const routes: Routes = [
  {path: '', component: CadetComponent, canActivate: [AuthGuard], children: [
    {path: '', component: DashboardComponent},
    {path: 'resume', component: ResumeComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'request', component: RequestComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'cadet-challenge', component: CadetChallengeComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'documentation', component: DocumentationComponent},
    {path: 'portfolio', component: PortfolioComponent, children: [
      {path: 'four-year-goals', component: FourYearGoalsComponent},
      {path: 'winning-colors', component: WinningColorsComponent},
      {path: 'success-profiler', component: SuccessProfilerComponent},
      {path: 'learning-style', component: LearningStyleComponent},
      {path: 'personal-ad', component: PersonalAdComponent},
      {path: 'human-graph', component: HumanGraphComponent},
      {path: 'resume', component: PortfolioResumeComponent},
      {path: 'financial-planning', component: FinancialPlanningComponent},
      {path: 'course-work', component: CourseWorkComponent},
      {path: 'essay', component: EssayComponent},
      {path: 'lesson-evidence', component: LessonEvidenceComponent},
      {path: 'written-summary', component: WrittenSummaryComponent},
      {path: 'achievements', component: AchievementsComponent},
      {path: 'portfolio-cadet-challenge', component: PortfolioCadetChallengeComponent},
      {path: 'service-learning', component: ServiceLearningComponent},
    ]},
    {path: '**', component: ErrorPageComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CadetRoutingModule {}
