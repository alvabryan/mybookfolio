import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.css']
})
export class EssayComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Essay');
  }

}
