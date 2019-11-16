import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'cadet', loadChildren: './cadet/cadet.module#CadetModule'},
  {path: 'home', loadChildren: './homepage/homepage.module#HomepageModuel'},
  {path: 'instructor', loadChildren: './instructor/instructor.module#InstructorModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
