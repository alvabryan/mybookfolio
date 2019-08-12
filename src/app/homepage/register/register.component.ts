import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private flassMessage: FlashMessagesService, private auth: AuthService) { }

  ngOnInit() { }

  onSignup(form: NgForm) {

    if ( !form.valid ) {
      return;
    }

    // user defined here
    const user = form.value;

    // password validation
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if ( password !== confirmPassword ) {
      this.flassMessage.show('Confirm Password does not match Password', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      this.auth.createUser(user);
    }

  }

}
