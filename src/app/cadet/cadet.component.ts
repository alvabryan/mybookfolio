import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cadet',
  templateUrl: './cadet.component.html',
  styleUrls: ['./cadet.component.css']
})
export class CadetComponent implements OnInit  {

  user: firebase.User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe( user => {
      this.user = user;
    });
  }

}
