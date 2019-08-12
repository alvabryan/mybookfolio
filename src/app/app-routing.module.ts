import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './cadet/dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CadetComponent } from './cadet/cadet.component';
import { ResumeComponent } from './cadet/resume/resume.component';
import { CalendarComponent } from './cadet/calendar/calendar.component';
import { RequestComponent } from './cadet/request/request.component';
import { AnalyticsComponent } from './cadet/analytics/analytics.component';
import { CadetChallengeComponent } from './cadet/cadet-challenge/cadet-challenge.component';
import { SettingsComponent } from './cadet/settings/settings.component';
import { DocumentationComponent } from './cadet/documentation/documentation.component';
import { PortfolioComponent } from './cadet/portfolio/portfolio.component';
import { FourYearGoalsComponent } from './cadet/portfolio/four-year-goals/four-year-goals.component';
import { WinningColorsComponent } from './cadet/portfolio/winning-colors/winning-colors.component';
import { SuccessProfilerComponent } from './cadet/portfolio/success-profiler/success-profiler.component';
import { LearningStyleComponent } from './cadet/portfolio/learning-style/learning-style.component';
import { PersonalAdComponent } from './cadet/portfolio/personal-ad/personal-ad.component';
import { HumanGraphComponent } from './cadet/portfolio/human-graph/human-graph.component';
import { FinancialPlanningComponent } from './cadet/portfolio/financial-planning/financial-planning.component';
import { CourseWorkComponent } from './cadet/portfolio/course-work/course-work.component';
import { EssayComponent } from './cadet/portfolio/essay/essay.component';
import { LessonEvidenceComponent } from './cadet/portfolio/lesson-evidence/lesson-evidence.component';
import { WrittenSummaryComponent } from './cadet/portfolio/written-summary/written-summary.component';
import { AchievementsComponent } from './cadet/portfolio/achievements/achievements.component';
import { ServiceLearningComponent } from './cadet/portfolio/service-learning/service-learning.component';
import { PortfolioResumeComponent } from './cadet/portfolio/portfolio-resume/portfolio-resume.component';
import { RegisterComponent } from './homepage/register/register.component';
import { LoginComponent } from './homepage/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadet', component: CadetComponent, canActivate: [AuthGuard], children: [
    {path: 'dashboard', component: DashboardComponent},
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
      {path: 'cadet-challenge', component: CadetChallengeComponent},
      {path: 'service-learning', component: ServiceLearningComponent},
    ]}
  ]},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
