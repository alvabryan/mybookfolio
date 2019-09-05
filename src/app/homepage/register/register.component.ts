import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean;

  signupType: string;

  constructor() { }

  ngOnInit() { }

  // signup type? instructor : cadet
  setSignup(type: string) {
    this.signupType = type;
  }

}
