import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseWorkComponent } from './course-work/course-work.component';
import { FinancialPlanningComponent } from './financial-planning/financial-planning.component';
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

@NgModule({
  declarations: [
    CourseWorkComponent,
    FinancialPlanningComponent,
    FourYearGoalsComponent,
    HumanGraphComponent,
    LearningStyleComponent,
    PersonalAdComponent,
    PortfolioCadetChallengeComponent,
    WinningColorsComponent,
    TextEditorComponent,
    PostSecondaryGoalsComponent
  ],
  imports: [
    CommonModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxDocViewerModule
  ],
  exports: [
    CourseWorkComponent,
    FinancialPlanningComponent,
    FourYearGoalsComponent,
    HumanGraphComponent,
    LearningStyleComponent,
    PersonalAdComponent,
    PortfolioCadetChallengeComponent,
    WinningColorsComponent
  ]
})
export class PortfolioModule { }
