import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromInstructor from '../store/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadet-data-request',
  templateUrl: './cadet-data-request.component.html',
  styleUrls: ['./cadet-data-request.component.css']
})
export class CadetDataRequestComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromInstructor.State>) { }

  tableData: any;
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if (data) {
          if (data.cadetData.cadetDataSheet) {
            this.tableData = Object.values(data.cadetData.cadetDataSheet);
          }
        }
      })
    );
  }

  checked(i) {
    console.log(i);
  }

  resetChecked() {
    console.log('reset');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
