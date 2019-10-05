import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadet-information',
  templateUrl: './cadet-information.component.html',
  styleUrls: ['./cadet-information.component.css']
})
export class CadetInformationComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  cadetInformation: any;
  cadetInformationForm: FormGroup;
  cadetUid: any;

  constructor(private db: AngularFirestore, private router: ActivatedRoute, private route: Router) { }

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
      this.router.queryParams.pipe(switchMap((params: Params) => {
        this.cadetUid = params.uid;
        return this.db.collection('users').doc(this.cadetUid).collection('cadetInformation').doc(this.cadetUid).valueChanges();
      })).subscribe( (data: any) => {
        this.cadetInformation = data;
        this.cadetInformationForm.patchValue({
          lastName: data.lastName,
          firstName: data.firstName,
          middleInitial: data.initial,
          gender: data.gender,
          birthMonth: data.birthMonth,
          birthYear: data.birthYear,
          let: data.letLevel,
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
      })
    );

    
  }

  toCadetPortfolio() {
    this.route.navigate(['/instructor/cadet-portfolio'], {queryParams: {uid: this.cadetUid}});
  }


  onSubmit() {
    console.log(this.cadetInformationForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
