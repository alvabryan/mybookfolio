import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-portfolio-resume',
  templateUrl: './portfolio-resume.component.html',
  styleUrls: ['./portfolio-resume.component.css']
})
export class PortfolioResumeComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Resume');
  }

}
