import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseWorkComponent } from './course-work/course-work.component';
import { FourYearGoalsComponent } from './four-year-goals/four-year-goals.component';
import { HumanGraphComponent } from './human-graph/human-graph.component';
import { LearningStyleComponent } from './learning-style/learning-style.component';
import { PersonalAdComponent } from './personal-ad/personal-ad.component';
import { PortfolioCadetChallengeComponent } from './portfolio-cadet-challenge/portfolio-cadet-challenge.component';
import { WinningColorsComponent } from './winning-colors/winning-colors.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { TextEditorComponent } from './course-work/text-editor/text-editor.component';
import { PostSecondaryGoalsComponent } from './four-year-goals/post-secondary-goals/post-secondary-goals.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import * as FromPortfolioIndex from './store/index';
import * as FromPortfolioEffects from './store/portolio.effects';
import { EffectsModule } from '@ngrx/effects';
import { PortfolioComponent } from './portfolio.component';
import { SharedModule } from '../shared/shared.module';
import { FileUploadComponent } from './course-work/file-upload/file-upload.component';
import { ViewModalComponent } from './course-work/view-modal/view-modal.component';
import { FinancialPlanningModule1Component } from './financial-planning-module1/financial-planning-module1.component';
import { FinancialPlanningModule2Component } from './financial-planning-module2/financial-planning-module2.component';
import { FinancialPlanningModule3Component } from './financial-planning-module3/financial-planning-module3.component';
import { FinancialPlanningModule4Component } from './financial-planning-module4/financial-planning-module4.component';
import { FinancialPlanningModule5Component } from './financial-planning-module5/financial-planning-module5.component';
import { FinancialPlanningModule6Component } from './financial-planning-module6/financial-planning-module6.component';

@NgModule({
  declarations: [
    CourseWorkComponent,
    FourYearGoalsComponent,
    HumanGraphComponent,
    LearningStyleComponent,
    PersonalAdComponent,
    PortfolioCadetChallengeComponent,
    WinningColorsComponent,
    TextEditorComponent,
    PostSecondaryGoalsComponent,
    PortfolioComponent,
    FileUploadComponent,
    ViewModalComponent,
    FinancialPlanningModule1Component,
    FinancialPlanningModule2Component,
    FinancialPlanningModule3Component,
    FinancialPlanningModule4Component,
    FinancialPlanningModule5Component,
    FinancialPlanningModule6Component
  ],
  imports: [
    CommonModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxDocViewerModule,
    StoreModule.forFeature('portfolio', FromPortfolioIndex.reducers),
    EffectsModule.forFeature([FromPortfolioEffects.PortfolioEffects]),
    SharedModule
  ],
  exports: [
    PortfolioComponent
  ]
})
export class PortfolioModule { }
