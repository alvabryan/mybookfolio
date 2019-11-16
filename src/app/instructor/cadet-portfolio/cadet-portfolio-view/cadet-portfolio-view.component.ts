import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, throwIfEmpty } from 'rxjs/operators';
import { InstructorService } from '../../instructor.service';
import { Subscription } from 'rxjs';
import { ProgressService } from './progress.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';

@Component({
  selector: 'app-cadet-portfolio-view',
  templateUrl: './cadet-portfolio-view.component.html',
  styleUrls: ['./cadet-portfolio-view.component.css']
})
export class CadetPortfolioViewComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  searchUid: any;
  searchCadet: any;

  filterLetLevel: number;

  queryParams: any;

  progress = {
      yearlyGoals: 0,
      winningColors: 0,
      successProfiler: 0,
      learningStyle: 0,
      personalAd: 0,
      humanGraph: 0,
      resume: 0,
      financialPlanning: 0,
      courseWork: 0,
      essay: 0,
      lessonEvidence: 0,
      writtenSummary: 0,
      achievements: 0,
      cadetChallenge: 0,
      serviceLearning: 0
  }

  constructor( 
    private db: AngularFirestore, 
    private router: Router, 
    private route: ActivatedRoute, 
    private store: Store<fromRoot.State>,
    private progressService: ProgressService) { }

  ngOnInit() {

    // this.subscription.add(
    //   this.route.queryParams.subscribe((params: Params) => {
    //     if(this.searchUid){
    //       this.store.select('instructor').subscribe((data: any) => {
    //         const progressData = data.cadetData.cadetProgress;
    //         this.searchCadet = progressData[this.searchUid];
    //         if(this.searchCadet){
    //           this.filterLetLevel = this.searchCadet.letLevel;
    //           console.log(this.searchCadet.progress)
    //           this.getProgress(this.filterLetLevel, this.searchCadet.progress);
    //         }
    //         this.queryParams = {'uid': this.searchUid, 'firstName': this.searchCadet.firstName, 'lastName': this.searchCadet.lastName, 'letLevel': this.filterLetLevel};
    //       })
    //     }
    //   })
    // );

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        const progressData = data.cadetData.cadetProgress;
        this.searchCadet = progressData[data.portfolio.cadetSearchData.uid];

        if(this.searchCadet){
          this.filterLetLevel = data.portfolio.cadetSearchData.letLevel;
          this.getProgress(this.filterLetLevel, this.searchCadet.progress);
        }

      })
    );
    
  }

  toCadetInformation(){
    //routerLink="/instructor/cadet-portfolio/cadet-information" [queryParams]="{uid: 'etURkGdh4PUO8bqIPLb7XJb88A92'}"
    this.router.navigate(['/instructor/cadet-portfolio/cadet-information'], 
    {queryParams: {'uid': this.searchUid, 'firstName': this.searchCadet.firstName, 'lastName': this.searchCadet.lastName, 'letLevel': this.filterLetLevel}});
  }

  getProgress(filterLet, searchCadetProgress){
    this.progress = this.progressService.getProgress(filterLet,searchCadetProgress);
  }

  setLetLevel(letLevel: number){
    this.filterLetLevel = letLevel;
    this.getProgress(this.filterLetLevel, this.searchCadet.progress);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
