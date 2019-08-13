import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// environmnet import
import { environment } from 'src/environments/environment';

// form modules
import { FormsModule } from '@angular/forms';

// flash message models
import { FlashMessagesModule } from 'angular2-flash-messages';

// components
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
import { SpinnerComponent } from './shared/spinner/spinner.component';


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
    CardItmeComponent,
    PortfolioComponent,
    FourYearGoalsComponent,
    WinningColorsComponent,
    SuccessProfilerComponent,
    LearningStyleComponent,
    PersonalAdComponent,
    HumanGraphComponent,
    FinancialPlanningComponent,
    CourseWorkComponent,
    EssayComponent,
    LessonEvidenceComponent,
    WrittenSummaryComponent,
    AchievementsComponent,
    ServiceLearningComponent,
    PortfolioResumeComponent,
    RegisterComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
