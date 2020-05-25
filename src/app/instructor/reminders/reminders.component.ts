import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Store } from '@ngrx/store';
import * as fromInstructor from '../store/index';
import * as remaindersAction from './store/remainders.actions';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  imageArray: Array<any> = [];
  sendLetLevel: Array<any> = [1, 2 , 3 , 4];
  sendPeriod: Array<any> = [1, 2, 3 , 4, 5, 6, 7, 8];
  url = '';
  message = '';

  showUrl = false;

  constructor(private FlassMessage: FlashMessagesService, private store: Store<fromInstructor.State>) { }

  ngOnInit() {
  }

  uploadImage(data) {
    if (data.target.files) {
      const filesArray = Object.values(data.target.files);
      if (this.imageArray.length >= 5) {
        this.FlassMessage.show('You cannot upload more than 5 images at a time!', {cssClass: 'alert-danger', timeout: 2000});
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

  togglePeriod(period: any) {
    if (this.sendPeriod.includes(period)) {
      this.sendPeriod = this.sendPeriod.filter((element) => {
        if (element !== period) {
          return element;
        }
      });
    } else {
      this.sendPeriod.push(period);
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
      let: this.sendLetLevel,
      period: this.sendPeriod
    }));
  }

}
