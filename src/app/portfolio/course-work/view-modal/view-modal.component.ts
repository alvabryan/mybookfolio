import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent implements OnInit {

  @Input() cadetViewData: any;

  constructor() { }

  ngOnInit() {
  }

}
