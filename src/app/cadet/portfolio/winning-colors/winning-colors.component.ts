import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../service/page-title.service';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebasePortfolioService } from '../service/firebase-portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-winning-colors',
  templateUrl: './winning-colors.component.html',
  styleUrls: ['./winning-colors.component.css']
})
export class WinningColorsComponent implements OnInit, OnDestroy {

  private winningColorsSubscription: Subscription = new Subscription();

  winningColorsForm: FormGroup;

  winningColorsData: any;


  constructor(private sendPageTitle: PageTitleService, private firebasePortfolio: FirebasePortfolioService, private fb: FormBuilder) {}

  ngOnInit() {
    this.sendPageTitle.pageTitle.next('Winning Colors');

    this.winningColorsForm = new FormGroup({
      A: new FormGroup({
        A1: new FormControl('0'),
        A2: new FormControl('0'),
        A3: new FormControl('0'),
        A4: new FormControl('0'),
        A5: new FormControl('0')
      }),
      B: new FormGroup({
        B1: new FormControl('0'),
        B2: new FormControl('0'),
        B3: new FormControl('0'),
        B4: new FormControl('0'),
        B5: new FormControl('0')
      }),
      C: new FormGroup({
        C1: new FormControl('0'),
        C2: new FormControl('0'),
        C3: new FormControl('0'),
        C4: new FormControl('0'),
        C5: new FormControl('0')
      }),
      D: new FormGroup({
        D1: new FormControl('0'),
        D2: new FormControl('0'),
        D3: new FormControl('0'),
        D4: new FormControl('0'),
        D5: new FormControl('0')
      })
    });

    this.winningColorsSubscription.add(this.firebasePortfolio.getWinningColors().subscribe(data => {
      this.winningColorsData = data;

      this.winningColorsSubscription.add(this.firebasePortfolio.selectLetLevel.subscribe( letLevel => {
        if ( !this.winningColorsData[letLevel] ) {
          this.winningColorsForm.setValue({
            A : {
              A1: 0,
              A2: 0,
              A3: 0,
              A4: 0,
              A5: 0
            },
            B: {
              B1: 0,
              B2: 0,
              B3: 0,
              B4: 0,
              B5: 0
            },
            C: {
              C1: 0,
              C2: 0,
              C3: 0,
              C4: 0,
              C5: 0
            },
            D: {
              D1: 0,
              D2: 0,
              D3: 0,
              D4: 0,
              D5: 0
            }
          });
          this.firebasePortfolio.lastUpdated.next('');
        } else {
          this.winningColorsForm.setValue({
            A: {
              ...this.winningColorsData[letLevel].A
            },
            B: {
              ...this.winningColorsData[letLevel].B
            },
            C: {
              ...this.winningColorsData[letLevel].C
            },
            D: {
              ...this.winningColorsData[letLevel].D
            }
          });
          this.firebasePortfolio.lastUpdated.next(this.winningColorsData[letLevel].dateSubmitted);
        }


      }));
    }));



  }

  ngOnDestroy() {
    this.winningColorsSubscription.unsubscribe();
  }

  onSubmit() {
    this.firebasePortfolio.setWinningColors(this.winningColorsForm.value);
  }



}
