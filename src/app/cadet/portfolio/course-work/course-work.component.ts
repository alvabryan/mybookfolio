import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-course-work',
  templateUrl: './course-work.component.html',
  styleUrls: ['./course-work.component.css']
})
export class CourseWorkComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Course Work');
  }

  onSubmit() {

  }

}
