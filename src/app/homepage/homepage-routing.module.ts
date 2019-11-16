import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';

const routes: Routes = [
  {path: '', component: HomepageComponent, children: [
    {path: '', component: HomeComponent}
  ]},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomepageRouting {}
