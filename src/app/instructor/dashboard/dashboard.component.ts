import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../instructor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private instructorService: InstructorService) { }

  ngOnInit() {
    
  }

}
