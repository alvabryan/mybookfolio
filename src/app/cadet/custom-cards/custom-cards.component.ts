import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-cards',
  templateUrl: './custom-cards.component.html',
  styleUrls: ['./custom-cards.component.css']
})
export class CustomCardsComponent implements OnInit {

  assignments = [1, 2];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendToCustomCardView(assignmentId: string) {
    this.router.navigate(['/cadet/assignment-view']);
  }

}
