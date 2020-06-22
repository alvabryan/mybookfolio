import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Store } from '@ngrx/store';
import * as fromInstructor from '../store/index';
import * as remaindersAction from './store/remainders.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit, OnDestroy {

  // subscription
  subscription: Subscription = new Subscription();

  imageArray: Array<any> = [];
  sendLetLevel: Array<any> = [1, 2 , 3 , 4];
  url = '';
  message = '';

  showUrl = false;

  // reminders
  reminders: Array<any>;


  constructor(private FlassMessage: FlashMessagesService, private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(remaindersAction.getReminders());
    this.subscription.add(this.store.select('instructor').subscribe((data: any) => {
      if (data.reminders) {
        if (data.reminders.reminderData) {
          this.reminders = data.reminders.reminderData;
        }
      }

    }));

  }

  uploadImage(data) {
    if (data.target.files) {
      const filesArray = Object.values(data.target.files);
      if (this.imageArray.length > 1) {
        this.FlassMessage.show('You cannot upload more than 1 image at a time!', {cssClass: 'alert-danger', timeout: 2000});
      } else {
        filesArray.forEach((image: any) => {
          if (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (event: any) => {
              this.imageArray.push({render: event.target, file: image});
            };
          } else {
            this.FlassMessage.show('Only images of type JPEG and PNG allowed!', {cssClass: 'alert-danger', timeout: 2000});
          }
        });
      }
    }
  }

  removeImage(index: number) {
    this.imageArray.splice(index);
  }

  toggleLet(letLevel: number) {
    console.log('toggled');
    if (this.sendLetLevel.includes(letLevel)) {
      this.sendLetLevel = this.sendLetLevel.filter((element) => {
        if (element !== letLevel) {
          return element;
        }
      });
    } else {
      this.sendLetLevel.push(letLevel);
    }
  }

  toggleShowUrl() {
    this.showUrl = !this.showUrl;
  }

  sendRemainder() {
    this.store.dispatch(remaindersAction.sendRemainder({
      images: this.imageArray,
      url: this.url,
      message: this.message,
      let: this.sendLetLevel
    }));

    this.imageArray = [];
    this.sendLetLevel = [1, 2 , 3 , 4];
    this.url = '';
    this.message = '';
    this.showUrl = false;
  }

  deleteReminder(id: string) {
    const alertBox = confirm('Are you sure you want to delete this reminder?');
    if (alertBox) {
      this.store.dispatch(remaindersAction.deleteReminder({reminderUid: id}));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
