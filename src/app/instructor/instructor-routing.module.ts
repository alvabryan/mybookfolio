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

const routes: Routes = [
  {path: '', canActivate: [AuthInstructor] , component: InstructorComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'cadets', component: CadetsComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'cadet-data-request', component: CadetDataRequestComponent},
    {path: 'cadet-challenge', component: CadetChallengeComponent},
    {path: 'battalion-users', component: BattalionUsersComponent},
    {path: 'support', component: SupportComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'documentation', component: DocumentationComponent},
    {path: 'portfolio', component: PortfolioComponent, children: []}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InstructorRouting {}


