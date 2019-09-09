import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';

@Component({
  selector: 'app-personal-ad',
  templateUrl: './personal-ad.component.html',
  styleUrls: ['./personal-ad.component.css']
})
export class PersonalAdComponent implements OnInit {

  constructor(private sendPageTitle: PageTitleService) { }

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Personal Ad');
  }

  onSubmit() {

  }
}
