import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-battalion-roster',
  templateUrl: './battalion-roster.component.html',
  styleUrls: ['./battalion-roster.component.css']
})
export class BattalionRosterComponent implements OnInit {

  filterForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      let: new FormControl('all'),
      period: new FormControl('all')
    })
  }

}
