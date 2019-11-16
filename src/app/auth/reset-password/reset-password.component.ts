import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isLoading: boolean;

  constructor(private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  resetPassword(form: NgForm) {

    if ( !form.valid ) {
      return;
    }

    this.isLoading = true;

    // this.auth.passwordReset(form.value.email);

    // this.auth.authError.pipe(take(1)).subscribe( error => {
    //   this.isLoading = false;
    //   const showError = String(error);

    //   this.flashMessages.show(showError, {cssClass: 'alert-danger', timeout: 2000});
    // });

    this.flashMessages.show('Please check your email.', {cssClass: 'alert-success', timeout: 2000});
    this.isLoading = false;
    form.reset();
  }
}
