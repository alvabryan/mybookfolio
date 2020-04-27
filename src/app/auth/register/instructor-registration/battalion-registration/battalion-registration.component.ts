import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

// ngrx
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../store/index';
import * as AuthActions from '../../../store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-battalion-registration',
  templateUrl: './battalion-registration.component.html',
  styleUrls: ['./battalion-registration.component.css']
})
export class BattalionRegistrationComponent implements OnInit {

  isLoading: any;
  subscription: Subscription = new Subscription();

  constructor( private flashMessage: FlashMessagesService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select('auth')).subscribe((data: any) => {
        this.isLoading = data.loading;
        if (data.authError) {
          this.flashMessage.show(data.authError, {cssClass: 'alert-danger', timeout: 3000});
        }
      })
    );
  }

  onBattalionSignup(form: NgForm) {
    const formData = form.value;
    if (this.checkPassword(formData.password, formData.confirmPassword)) {
      const currentBattalionCode = this.randomString();
      this.isLoading = true;
      this.store.dispatch(AuthActions.battalionRegisterStart({
        registrationType: 'battalion',
        battalionCode: currentBattalionCode,
        ...formData
      }));
    }
  }

  // checks whether confirm password matches password
  checkPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      this.flashMessage.show('Confirm password does not match password.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } else {
      return true;
    }
  }

  randomString() {
    let text = '';
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text.toLocaleUpperCase();
  }

}
