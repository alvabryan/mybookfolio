import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-financial-planning',
  templateUrl: './financial-planning.component.html',
  styleUrls: ['./financial-planning.component.css']
})
export class FinancialPlanningComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Financial Planning');
  }

}
