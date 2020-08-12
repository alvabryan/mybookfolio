import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

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
import { CadetDataSheetComponent } from './cadet-data-sheet/cadet-data-sheet.component';
import { RemindersComponent } from './reminders/reminders.component';
import { CustomCardsComponent } from './custom-cards/custom-cards.component';
import { CustomCardsViewComponent } from './custom-cards/custom-cards-view/custom-cards-view.component';


const routes: Routes = [
  {path: '', component: CadetComponent, canActivate: [AuthGuard], children: [
    {path: '', component: DashboardComponent},
    {path: 'assignments', component: CustomCardsComponent},
    {path: 'assignment-view/:id', component: CustomCardsViewComponent},
    {path: 'resume', component: ResumeComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'request', component: RequestComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'cadet-challenge', component: CadetChallengeComponent},
    {path: 'cadet-data-sheet', component: CadetDataSheetComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'documentation', component: DocumentationComponent},
    {path: 'portfolio', component: CadetPortfolioComponent},
    {path: 'reminders', component: RemindersComponent},
    {path: '**', component: ErrorPageComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CadetRoutingModule {}
