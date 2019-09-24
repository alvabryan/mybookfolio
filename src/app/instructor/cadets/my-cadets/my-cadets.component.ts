import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-cadets',
  templateUrl: './my-cadets.component.html',
  styleUrls: ['./my-cadets.component.css']
})
export class MyCadetsComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;

  subscription: Subscription = new Subscription();

  filterRoster: Array<any>;
  battalionRoster: Array<any>;

  constructor(private auth: AuthService ,private portfolioService: PortfolioService, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {

    this.filterForm = new FormGroup({
      let: new FormControl('All'),
      period: new FormControl('All')
    })

    this.subscription.add(
      this.portfolioService.getBattalionRoster().subscribe(data => {
        const values = Object.values(data[0]);
        this.battalionRoster = values;
        this.filterRoster = this.battalionRoster;
      })
    );

    this.filterForm.setValue({
      let: 'all',
      period: 'all'
    })

  }

  toCadetPortfolio(uid) {
    const cadetUid = uid.replace(/\s/g, "");
    console.log(uid);
    this.router.navigate(['/instructor/cadet-portfolio'], {queryParams:{uid:cadetUid}});
  }

  onFilter(){
    this.filterRoster = [];
    const letLevel = this.filterForm.value.let;
    const period = this.filterForm.value.period;

    this.battalionRoster.forEach((data)=>{
      if(letLevel == 'all' && period == 'all') {
        this.filterRoster = this.battalionRoster;
      } else if (letLevel != 'all' && period == 'all') {
        if( data.let == letLevel) {
          this.filterRoster.push(data);
        }
      } else if (letLevel == 'all' && period != 'all') {
        if( data.period == period) {
          this.filterRoster.push(data);
        }
      } else if (letLevel != 'all' && period != 'all' ) {
        if( data.period == period && data.let == letLevel) {
          this.filterRoster.push(data);
        }
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
