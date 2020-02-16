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
import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { CadetPortfolioComponent } from './cadet-portfolio/cadet-portfolio.component';


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
    {path: 'portfolio', component: CadetPortfolioComponent},
    {path: '**', component: ErrorPageComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CadetRoutingModule {}
