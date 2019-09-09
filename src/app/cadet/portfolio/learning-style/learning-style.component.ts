import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-learning-style',
  templateUrl: './learning-style.component.html',
  styleUrls: ['./learning-style.component.css']
})
export class LearningStyleComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Learing Style Inventory');
  }

}
