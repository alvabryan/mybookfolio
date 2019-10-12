import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  subscription: Subscription = new Subscription();

  cadetData = {};

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.cadetData = params;
      })
    );
  }


  setLetLevel(letLevel){
    console.log(letLevel);
  }

}
