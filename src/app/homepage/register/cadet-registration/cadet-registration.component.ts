import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-cadet-registration',
  templateUrl: './cadet-registration.component.html',
  styleUrls: ['./cadet-registration.component.css']
})
export class CadetRegistrationComponent implements OnInit {

  isLoading = false;

  constructor(private auth: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    // checks wether form was valid
    if ( !form.valid ) {
      return;
    }

    // sets the loading button
    this.isLoading = true;


    // user defined here
    const user = form.value;

    // password validation
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if ( password !== confirmPassword ) {
      this.auth.authErrorHandling({
        code: 'auth/unvalid-password',
        message: 'Confirm password does not match password.'
      });
      this.isLoading = false;
    } else {
      this.auth.createUser(user);
    }

    this.auth.authError.pipe(take(1)).subscribe( error => {
      const showError = String(error);
      this.flashMessage.show(showError, {cssClass: 'alert-danger', timeout: 2000});
      this.isLoading = false;
    });

  }

}
