import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadet-data-sheet',
  templateUrl: './cadet-data-sheet.component.html',
  styleUrls: ['./cadet-data-sheet.component.css']
})
export class CadetDataSheetComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  cadetInformationForm: FormGroup;

  cadetInformation = {firstName: 'Jairo', lastName: 'Alvarenga'};

  constructor() { }

  ngOnInit() {
    this.cadetInformationForm = new FormGroup({
      lastName: new FormControl(''),
      firstName: new FormControl(''),
      middleInitial: new FormControl(''),
      gender: new FormControl(''),
      birthMonth: new FormControl(''),
      birthYear: new FormControl(''),
      let: new FormControl(''),
      grade: new FormControl(''),
      race: new FormControl(''),
      studentType: new FormControl(''),
      differSchool: new FormControl(''),
      differSchoolName: new FormControl(''),
      period: new FormControl(''),
      enrollmentDate: new FormGroup({
        day: new FormControl(''),
        month: new FormControl(''),
        year: new FormControl('')
      }),
      graduationYear: new FormControl(''),
      graduationMonth: new FormControl(''),
      studentId: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.cadetInformationForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
