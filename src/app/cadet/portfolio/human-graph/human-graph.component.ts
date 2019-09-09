import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-human-graph',
  templateUrl: './human-graph.component.html',
  styleUrls: ['./human-graph.component.css']
})
export class HumanGraphComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Human Graph Activity');
  }

  onSubmit() {

  }

}
