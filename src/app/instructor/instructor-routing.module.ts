import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { AuthInstructor } from './auth-instructor.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadetsComponent } from './cadets/cadets.component';
import { CadetDataRequestComponent } from './cadet-data-request/cadet-data-request.component';
import { BattalionUsersComponent } from './battalion-users/battalion-users.component';
import { SupportComponent } from './support/support.component';
import { InstructorPortfolioComponent } from './instructor-portfolio/instructor-portfolio.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';
import { CadetPortfolioComponent } from './cadet-portfolio/cadet-portfolio.component';
import { CadetPortfolioViewComponent } from './cadet-portfolio/cadet-portfolio-view/cadet-portfolio-view.component';
import { CadetInformationComponent } from './cadet-portfolio/cadet-information/cadet-information.component';
import { SettingInstructorComponent } from './setting-instructor/setting-instructor.component';
import { AuthAprovelComponent } from './auth-aprovel/auth-aprovel.component';
import { RemindersComponent } from './reminders/reminders.component';
import { CustomCardsInstructorComponent } from './custom-cards-instructor/custom-cards-instructor.component';
import { CustomCardsViewInstructorComponent } from './custom-cards-instructor/custom-cards-view-instructor/custom-cards-view-instructor.component';
import { ShareBattalionCodeComponent } from './share-battalion-code/share-battalion-code.component';

const routes: Routes = [
  {path: '', canActivate: [AuthInstructor] , component: InstructorComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'assignments', component: CustomCardsInstructorComponent},
    {path: 'assignment-view/:id', component: CustomCardsViewInstructorComponent},
    {path: 'cadets', component: CadetsComponent},
    {path: 'portfolio-view', component: PortfolioViewComponent},
    {path: 'battalion-users', component: BattalionUsersComponent},
    {path: 'support', component: SupportComponent},
    {path: 'settings', component: SettingInstructorComponent},
    {path: 'documentation', component: DocumentationComponent},
    {path: 'cadet-portfolio', component: CadetPortfolioComponent, children: [
      {path: '', component: CadetPortfolioViewComponent},
      {path: 'cadet-information', component: CadetInformationComponent}
    ]},
    {path: 'portfolio', component: InstructorPortfolioComponent},
    {path: 'reminders', component: RemindersComponent},
    {path: 'share-battalion-code', component: ShareBattalionCodeComponent}
  ]},
  {path: 'approvel', component: AuthAprovelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InstructorRouting {}


