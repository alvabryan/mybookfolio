import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './cadet/dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NavigationComponent } from './cadet/page-skeleton/navigation/navigation.component';
import { SidebarComponent } from './cadet/page-skeleton/sidebar/sidebar.component';
import { CadetComponent } from './cadet/cadet.component';
import { ResumeComponent } from './cadet/resume/resume.component';
import { CalendarComponent } from './cadet/calendar/calendar.component';
import { RequestComponent } from './cadet/request/request.component';
import { AnalyticsComponent } from './cadet/analytics/analytics.component';
import { CadetChallengeComponent } from './cadet/cadet-challenge/cadet-challenge.component';
import { SettingsComponent } from './cadet/settings/settings.component';
import { DocumentationComponent } from './cadet/documentation/documentation.component';
import { CardsComponent } from './cadet/dashboard/cards/cards.component';
import { CardItmeComponent } from './cadet/dashboard/cards/card-itme/card-itme.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    ErrorPageComponent,
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
    CardItmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
