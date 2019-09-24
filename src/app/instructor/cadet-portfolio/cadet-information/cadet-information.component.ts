import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadet-information',
  templateUrl: './cadet-information.component.html',
  styleUrls: ['./cadet-information.component.css']
})
export class CadetInformationComponent implements OnInit {

  cadetInformation: any;
  cadetInformationForm: FormGroup;

  constructor(private db: AngularFirestore, private router: ActivatedRoute) { }

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

    this.router.queryParams.pipe(switchMap((params: Params) => {
      const cadetUid = params.uid;
      return this.db.collection('users').doc(cadetUid).collection('cadetInformation').doc(cadetUid).valueChanges();
    })).subscribe( (data: any) => {
      this.cadetInformation = data;
      this.cadetInformationForm.patchValue({
        lastName: data.lastName,
        firstName: data.firstName,
        middleInitial: data.initial,
        gender: data.gender,
        birthMonth: data.birthMonth,
        birthYear: data.birthYear,
        let: data.let,
        grade: data.grade,
        race: data.race,
        studentType: data.studentType,
        differSchool: data.differSchool,
        differSchoolName: data.differSchoolName,
        period: data.period,
        enrollmentDate: {
          day: '01',
          month: 'Jun',
          year: '2019'
        },
        graduationYear: data.graduationYear,
        graduationMonth: data.graduationMonth,
        studentId: data.studentId
      });
    });
  }


  onSubmit() {
    console.log(this.cadetInformationForm.value);
  }

}
