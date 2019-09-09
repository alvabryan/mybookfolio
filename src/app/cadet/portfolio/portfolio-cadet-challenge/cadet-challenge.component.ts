import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-portfolio-cadet-challenge',
  templateUrl: './cadet-challenge.component.html',
  styleUrls: ['./cadet-challenge.component.css']
})
export class PortfolioCadetChallengeComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Cadet Challenge');
  }

}
