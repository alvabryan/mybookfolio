import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRouting } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { NavigationComponent } from './page-skeleton/navigation/navigation.component';
import { SidebarComponent } from './page-skeleton/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InstructorComponent,
    NavigationComponent,
    SidebarComponent
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
