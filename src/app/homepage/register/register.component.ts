import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean;

  constructor(private flassMessage: FlashMessagesService, private auth: AuthService) { }

  ngOnInit() { }

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
      this.flassMessage.show(showError, {cssClass: 'alert-danger', timeout: 2000});
      this.isLoading = false;
    });

  }

}
