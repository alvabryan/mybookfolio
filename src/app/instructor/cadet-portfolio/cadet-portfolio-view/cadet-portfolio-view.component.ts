import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, throwIfEmpty } from 'rxjs/operators';
import { InstructorService } from '../../instructor.service';
import { Subscription } from 'rxjs';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-cadet-portfolio-view',
  templateUrl: './cadet-portfolio-view.component.html',
  styleUrls: ['./cadet-portfolio-view.component.css']
})
export class CadetPortfolioViewComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  searchUid: any;
  searchCadet: {
    firstName: string,
    lastName: string,
    letLevel: number,
    period: number,
    progress: {
      [key: string]: any
    }
  };

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
    private instructorService: InstructorService,
    private progressService: ProgressService) { }

  ngOnInit() {

    this.subscription.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.searchUid = params.uid.replace(/\s/g, "").replace("[%]","");
  
        this.instructorService.getCadetInformation().subscribe(data => {
          this.searchCadet = data[this.searchUid]
          if (this. searchCadet) {
            this.getProgress();
          }
        });
      })
    );
    


  }

  toCadetInformation(){
    //routerLink="/instructor/cadet-portfolio/cadet-information" [queryParams]="{uid: 'etURkGdh4PUO8bqIPLb7XJb88A92'}"
    this.router.navigate(['/instructor/cadet-portfolio/cadet-information'], {queryParams: {'uid': this.searchUid}});
  }

  getProgress(){
    this.progress = this.progressService.getProgress(this.searchCadet.letLevel, this.searchCadet.progress);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
