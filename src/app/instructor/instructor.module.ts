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
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    InstructorRouting,
    SharedModule
  ],
  exports: [],
  providers: [],
})


export class InstructorModule {}
