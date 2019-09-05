import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-instructor-registration',
  templateUrl: './instructor-registration.component.html',
  styleUrls: ['./instructor-registration.component.css']
})
export class InstructorRegistrationComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  onInstructorSignup(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    const instructorData = form.value;
  }

}
