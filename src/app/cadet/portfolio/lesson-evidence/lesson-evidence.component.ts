import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-lesson-evidence',
  templateUrl: './lesson-evidence.component.html',
  styleUrls: ['./lesson-evidence.component.css']
})
export class LessonEvidenceComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Lesson Evidence');
  }

}
