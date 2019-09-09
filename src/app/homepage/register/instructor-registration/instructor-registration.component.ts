import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-instructor-registration',
  templateUrl: './instructor-registration.component.html',
  styleUrls: ['./instructor-registration.component.css']
})
export class InstructorRegistrationComponent implements OnInit {

  isLoading = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onInstructorSignup(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    // data from form
    const instructorData = form.value;

    // password validation
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    // checks whether passwords match
    if ( password !== confirmPassword ) {
      this.auth.authErrorHandling({
        code: 'auth/unvalid-password',
        message: 'Confirm password does not match password.'
      });
      this.isLoading = false;
    } else {
      this.auth.createUser({
        type: 'instructor',
        data: {
          battalionCode: 'ZZZZZ',
          ...instructorData
        }
      });
    }
  }

}
