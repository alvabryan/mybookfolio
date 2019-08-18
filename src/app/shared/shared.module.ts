import { NgModule } from '@angular/core';

import { ErrorPageComponent } from './error-page/error-page.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorPageComponent
  ],
  exports: [
    SpinnerComponent,
    ErrorPageComponent
  ]
})


export class SharedModule {}
