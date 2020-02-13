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
import { CadetDataRequestComponent } from './cadet-data-request/cadet-data-request.component';
import { BattalionUsersComponent } from './battalion-users/battalion-users.component';
import { SupportComponent } from './support/support.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CadetPortfolioComponent } from './cadet-portfolio/cadet-portfolio.component';
import { CadetPortfolioViewComponent } from './cadet-portfolio/cadet-portfolio-view/cadet-portfolio-view.component';
import { CadetInformationComponent } from './cadet-portfolio/cadet-information/cadet-information.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxDocViewerModule } from 'node_modules/ngx-doc-viewer';

// ngrx
import { StoreModule } from '@ngrx/store';
import * as InstructorIndex from './store/index';
import { EffectsModule } from '@ngrx/effects';
import * as InstructorEffects from './store/instructor.effects';
import * as PortfolioEffects from '../portfolio/store/portolio.effects';
import * as BattalionUsersEffect from './battalion-users/store/battalion-users.effects';
import { SettingInstructorComponent } from './setting-instructor/setting-instructor.component';
import { PortfolioModule } from '../portfolio/portfolio.module';

@NgModule({
  declarations: [
    InstructorComponent,
    NavigationComponent,
    SidebarComponent,
    DashboardComponent,
    CardsComponent,
    CardItemComponent,
    CadetsComponent,
    CadetDataRequestComponent,
    BattalionUsersComponent,
    SupportComponent,
    DocumentationComponent,
    PortfolioComponent,
    PortfolioViewComponent,
    CadetPortfolioComponent,
    CadetPortfolioViewComponent,
    CadetInformationComponent,
    SettingInstructorComponent
  ],
  imports: [
    CommonModule,
    InstructorRouting,
    SharedModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    StoreModule.forFeature('instructor', InstructorIndex.reducers),
    EffectsModule.forFeature([InstructorEffects.InstructorEffects, PortfolioEffects.PortfolioEffects, BattalionUsersEffect.BattalionUsersEFfect]),
    NgxDocViewerModule,
    PortfolioModule
  ],
  exports: [],
  providers: [],
})


export class InstructorModule {}
