import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit {

  pageTitle: string;
  pageUrl: string;

  cadetsData = [
    {
      lastName: 'Alvarenga',  
      firstName: 'Bryan',
      period: 5,
      let: 3,
      progress: 50
    },
    {
      lastName: 'Alvarenga',  
      firstName: 'Jairo',
      period: 7,
      let: 4,
      progress: 30
    },
    {
      lastName: 'Alvarenga',  
      firstName: 'Odalys',
      period: 8,
      let: 2,
      progress: 100
    },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe( (params: Params) => {
      this.pageTitle = params['name'];
      this.pageUrl = params['url'];
    });
  }

}
