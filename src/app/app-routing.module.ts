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

const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'cadet', component: CadetComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'resume', component: ResumeComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'request', component: RequestComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'cadet-challenge', component: CadetChallengeComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'documentation', component: DocumentationComponent}
  ]},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
