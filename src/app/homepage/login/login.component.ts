import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;


  errorAuth: any;

  constructor(private auth: AuthService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {}

  login(form: NgForm) {
    if ( !form.valid ) {
      return;
    }

    this.isLoading = true;
    this.auth.login(form.value.email, form.value.password);

    this.auth.authError.pipe(take(1)).subscribe( error => {
      const showError = String(error);
      this.flashMessages.show( showError, {cssClass: 'alert-danger', timeout: 2000});
      this.isLoading = false;
    });
  }

}
