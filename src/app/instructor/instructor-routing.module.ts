import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthInstructor } from '../auth/auth-instructor.guard';

const routes: Routes = [
  {path: '', canActivate: [AuthInstructor] , component: InstructorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InstructorRouting {}


