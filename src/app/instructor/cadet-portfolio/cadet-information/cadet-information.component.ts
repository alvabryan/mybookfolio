import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, map, mergeMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription, EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as InstructorActions from '../../store/instructor.actions';
@Component({
  selector: 'app-cadet-information',
  templateUrl: './cadet-information.component.html',
  styleUrls: ['./cadet-information.component.css']
})
export class CadetInformationComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  cadetInformation: any;
  cadetInformationForm: FormGroup;
  currentYear = (new Date()).getFullYear();

  constructor(private db: AngularFirestore, private router: ActivatedRoute, private route: Router, private store: Store<fromInstructor.State>) { }

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


    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if (data) {
          if (data.cadetData.cadetDataSheet && data.currentCadet.cadetSearchData) {
            const currentCadetUid = data.currentCadet.cadetSearchData.uid;
            const cadetInfo = data.cadetData.cadetDataSheet[currentCadetUid];
            this.cadetInformation = cadetInfo;
            if (cadetInfo) {
              this.cadetInformationForm.setValue({
                lastName: cadetInfo.lastName ? cadetInfo.lastName : '',
                firstName: cadetInfo.firstName ? cadetInfo.firstName : '',
                middleInitial: cadetInfo.middleInitial ? cadetInfo.middleInitial : '',
                gender: cadetInfo.gender ? cadetInfo.gender : '',
                birthMonth: cadetInfo.birthMonth ? cadetInfo.birthMonth : '',
                birthYear: cadetInfo.birthYear ? cadetInfo.birthYear : '',
                let: cadetInfo.letLevel ? cadetInfo.letLevel : '',
                grade: cadetInfo.grade ? cadetInfo.grade : '',
                race: cadetInfo.race ? cadetInfo.race : '',
                studentType: cadetInfo.studentType ? cadetInfo.studentType : '',
                differSchool: cadetInfo.differSchool ? cadetInfo.differSchool : '',
                differSchoolName: cadetInfo.differSchoolName ? cadetInfo.differSchoolName : '',
                period: cadetInfo.period ? cadetInfo.period : '',
                enrollmentDate: !cadetInfo.enrollmentDate ? {
                  day: '',
                  month: '',
                  year: ''
                } : {
                  day: cadetInfo.enrollmentDate.day ? cadetInfo.enrollmentDate.day : '',
                  month: cadetInfo.enrollmentDate.month ? cadetInfo.enrollmentDate.month : '',
                  year: cadetInfo.enrollmentDate.year ? cadetInfo.enrollmentDate.year : ''
                },
                graduationYear: cadetInfo.graduationYear ? cadetInfo.graduationYear : '',
                graduationMonth: cadetInfo.graduationMonth ? cadetInfo.graduationMonth : '',
                studentId: cadetInfo.studentId ? cadetInfo.studentId : ''
              });
            } else {
              this.cadetInformation = {
                firstName: 'Data currently unavailable',
                lastName: '',
              };
            }
          }
        }
      })
    );


  }

  toCadetPortfolio() {
    this.route.navigate(['/instructor/cadet-portfolio']);
  }


  onSubmit() {
    const formData = this.cadetInformationForm.value;
    this.store.dispatch(InstructorActions.updateDataSheet({data: formData}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
