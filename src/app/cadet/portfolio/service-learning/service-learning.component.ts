import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-service-learning',
  templateUrl: './service-learning.component.html',
  styleUrls: ['./service-learning.component.css']
})
export class ServiceLearningComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Service Learning');
  }

}
