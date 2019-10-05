import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, throwIfEmpty } from 'rxjs/operators';
import { InstructorService } from '../../instructor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadet-portfolio-view',
  templateUrl: './cadet-portfolio-view.component.html',
  styleUrls: ['./cadet-portfolio-view.component.css']
})
export class CadetPortfolioViewComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  searchUid: any;
  searchCadet: any;

  constructor( private db: AngularFirestore, private router: Router, private route: ActivatedRoute, private instructorService: InstructorService) { }

  ngOnInit() {

    this.subscription.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.searchUid = params.uid.replace(/\s/g, "").replace("[%]","");
  
        this.instructorService.getCadetInformation().subscribe(data => {
          this.searchCadet = data[this.searchUid];
        });
      })
    );
    


  }

  toCadetInformation(){
    //routerLink="/instructor/cadet-portfolio/cadet-information" [queryParams]="{uid: 'etURkGdh4PUO8bqIPLb7XJb88A92'}"
    this.router.navigate(['/instructor/cadet-portfolio/cadet-information'], {queryParams: {'uid': this.searchUid}});
  }

  getWidth() {
    return '100%';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
