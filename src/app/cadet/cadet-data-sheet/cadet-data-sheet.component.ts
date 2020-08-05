import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as fromCadet from '../store/index';
import * as CadetActions from '../store/cadet.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cadet-data-sheet',
  templateUrl: './cadet-data-sheet.component.html',
  styleUrls: ['./cadet-data-sheet.component.css']
})
export class CadetDataSheetComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  cadetInformationForm: FormGroup;

  currentYear = (new Date()).getFullYear();

  constructor(private store: Store<fromCadet.State>) { }

  ngOnInit() {
    this.cadetInformationForm = new FormGroup({
      gender: new FormControl('', Validators.required),
      birthMonth: new FormControl('', Validators.required),
      birthYear: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      race: new FormControl('', Validators.required),
      studentType: new FormControl('', Validators.required),
      differSchool: new FormControl('', Validators.required),
      differSchoolName: new FormControl(''),
      enrollmentDate: new FormGroup({
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required)
      }),
      graduationYear: new FormControl('', Validators.required),
      graduationMonth: new FormControl('', Validators.required),
      studentId: new FormControl('')
    });

    this.subscription.add(
      this.store.select('cadet').subscribe((data: any) => {
        if (data.cadetDataSheet) {
          const cadetDataSheet = data.cadetDataSheet;
          this.cadetInformationForm.setValue({
            gender: cadetDataSheet.gender ? cadetDataSheet.gender : '',
            birthMonth: cadetDataSheet.birthMonth ? cadetDataSheet.birthMonth : '',
            birthYear: cadetDataSheet.birthYear ? cadetDataSheet.birthYear : '',
            grade: cadetDataSheet.grade ? cadetDataSheet.grade : '',
            race: cadetDataSheet.race ? cadetDataSheet.race : '',
            studentType: cadetDataSheet.studentType ? cadetDataSheet.studentType : '',
            differSchool: cadetDataSheet.differSchool ? cadetDataSheet.differSchool : '',
            differSchoolName: cadetDataSheet.differSchoolName ? cadetDataSheet.differSchoolName : '',
            enrollmentDate: cadetDataSheet.enrollmentDate ? {
              day: cadetDataSheet.enrollmentDate.day,
              month: cadetDataSheet.enrollmentDate.month,
              year: cadetDataSheet.enrollmentDate.year
            } : {
              day: '',
              month: '',
              year: ''
            },
            graduationYear: cadetDataSheet.graduationYear ? cadetDataSheet.graduationYear : '',
            graduationMonth: cadetDataSheet.graduationMonth ? cadetDataSheet.graduationMonth : '',
            studentId: cadetDataSheet.studentId ? cadetDataSheet.studentId : ''
          });
        }
      })
    );

  }


  get gender() { return this.cadetInformationForm.get('gender'); }
  get birthMonth() { return this.cadetInformationForm.get('birthMonth'); }
  get birthYear() { return this.cadetInformationForm.get('birthYear'); }
  get grade() { return this.cadetInformationForm.get('grade'); }
  get race() { return this.cadetInformationForm.get('race'); }
  get studentType() { return this.cadetInformationForm.get('studentType'); }
  get differSchool() { return this.cadetInformationForm.get('differSchool'); }
  get enrollmentDate() { return this.cadetInformationForm.get('enrollmentDate'); }
  get graduationYear() { return this.cadetInformationForm.get('graduationYear'); }
  get graduationMonth() { return this.cadetInformationForm.get('graduationMonth'); }

  onSubmit() {
    const formData = this.cadetInformationForm.value;
    const uploadObject = {...formData};
    this.store.dispatch(CadetActions.setCadetDataSheet({data: uploadObject}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
