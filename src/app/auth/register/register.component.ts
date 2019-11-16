import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupType: string;

  constructor(private route: Router) { }

  ngOnInit() { }

  // signup type? instructor : cadet
  setSignup(type: string) {
    this.signupType = type;
  }

  back(){
    if(this.signupType){
      this.signupType = null;
    }else{
      this.route.navigate(['/']);
    }
  }

}
