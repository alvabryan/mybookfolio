import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

//ngrx root
import * as fromRoot from '../../store/index';

//auth actions
import * as AuthActions from '../store/auth.actions';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;


  errorAuth: any;

  constructor(private store: Store<fromRoot.State>,private flashMessages: FlashMessagesService) { }

  ngOnInit() {}

  login(data: NgForm) {
    if ( !data.valid ) {
      return;
    }

    this.isLoading = true;

    const userData = data.form.value;

    this.store.dispatch(AuthActions.loginStart(userData));

    this.store.pipe(select('auth')).subscribe((data: any) => {
      this.isLoading = data.loading;
      if (data.authError) {
        this.flashMessages.show(data.authError.error, {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

}
