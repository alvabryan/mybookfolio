import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-written-summary',
  templateUrl: './written-summary.component.html',
  styleUrls: ['./written-summary.component.css']
})
export class WrittenSummaryComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Written Summary');
  }

}
