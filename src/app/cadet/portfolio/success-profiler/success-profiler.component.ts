import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-success-profiler',
  templateUrl: './success-profiler.component.html',
  styleUrls: ['./success-profiler.component.css']
})
export class SuccessProfilerComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Success Profiler');
  }

}
