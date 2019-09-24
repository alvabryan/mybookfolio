import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cadet-portfolio-view',
  templateUrl: './cadet-portfolio-view.component.html',
  styleUrls: ['./cadet-portfolio-view.component.css']
})
export class CadetPortfolioViewComponent implements OnInit {

  searchUid: any;
  searchCadet: any;

  constructor(private portfolioService: PortfolioService, private db: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {

    const battalionCode = this.portfolioService.battalionCode;

    this.route.queryParams.pipe(switchMap((params: Params)=>{
      this.searchUid = params.uid.replace(/\s/g, "").replace("[%]","");
      return this.db.collection('battalions').doc(battalionCode).collection('cadets').doc(this.searchUid).valueChanges();
    })).subscribe( data => {
      this.searchCadet = data;
    });


  }

}
