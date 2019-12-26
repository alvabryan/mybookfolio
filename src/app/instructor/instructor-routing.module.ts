import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { AuthInstructor } from '../auth/auth-instructor.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadetsComponent } from './cadets/cadets.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CadetDataRequestComponent } from './cadet-data-request/cadet-data-request.component';
import { CadetChallengeComponent } from './cadet-challenge/cadet-challenge.component';
import { BattalionUsersComponent } from './battalion-users/battalion-users.component';
import { SupportComponent } from './support/support.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';
import { DocumentationComponent } from './documentation/documentation.component';
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
import { CadetPortfolioComponent } from './cadet-portfolio/cadet-portfolio.component';
import { CadetPortfolioViewComponent } from './cadet-portfolio/cadet-portfolio-view/cadet-portfolio-view.component';
import { CadetInformationComponent } from './cadet-portfolio/cadet-information/cadet-information.component';

const routes: Routes = [
  {path: '', canActivate: [AuthInstructor] , component: InstructorComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'cadets', component: CadetsComponent, children: [
      {path: '', component: MyCadetsComponent},
      {path: 'battalion', component: BattalionRosterComponent}
    ]},
    {path: 'portfolio-view', component: PortfolioViewComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'cadet-data-request', component: CadetDataRequestComponent},
    {path: 'cadet-challenge', component: CadetChallengeComponent},
    {path: 'battalion-users', component: BattalionUsersComponent},
    {path: 'support', component: SupportComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'documentation', component: DocumentationComponent},
    {path: 'cadet-portfolio', component: CadetPortfolioComponent, children: [
      {path: '', component: CadetPortfolioViewComponent},
      {path: 'cadet-information', component: CadetInformationComponent}
    ]},
    {path: 'portfolio', component: PortfolioComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: '/instructor'},
      {path: 'four-year-goals', component: FourYearGoalsComponent},
      {path: 'winning-colors', component: WinningColorsComponent},
      {path: 'learning-style', component: LearningStyleComponent},
      {path: 'personal-ad', component: PersonalAdComponent},
      {path: 'human-graph', component: HumanGraphComponent},
      {path: 'financial-planning', component: FinancialPlanningComponent},
      {path: 'course-work/:name', component: CourseWorkComponent},
      {path: 'portfolio-cadet-challenge', component: PortfolioCadetChallengeComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InstructorRouting {}


