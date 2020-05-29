import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCadet from '../store/index';
import * as cadetActions from '../store/cadet.actions';
import { Subscription, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  subscription: Subscription = new Subscription();

  reminders: Array<any> = [];

  constructor(private store: Store<fromCadet.State>) { }

  ngOnInit() {

    this.store.dispatch(cadetActions.getReminders());

    this.subscription.add(
      this.store.select('cadet').subscribe((data: any) => {
        if (data) {
          if (data.reminderData) {
            this.reminders = data.reminderData;
          }
        }
      })
    );
  }

}
