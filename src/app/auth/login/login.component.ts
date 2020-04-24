import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

//ngrx root
import * as fromRoot from '../../store/index';

//auth actions
import * as AuthActions from '../store/auth.actions';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  subscription: Subscription = new Subscription();

  errorAuth: any;

  constructor(private store: Store<fromRoot.State>,private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select('auth')).subscribe((data: any) => {
        this.isLoading = data.loading;
        if (data.authError) {
          this.flashMessages.show(data.authError, {cssClass: 'alert-danger', timeout: 3000});
        }
      })
    );
  }

  login(data: NgForm) {
    if ( !data.valid ) {
      return;
    }

    this.isLoading = true;

    const userData = data.form.value;

    this.store.dispatch(AuthActions.loginStart(userData));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
