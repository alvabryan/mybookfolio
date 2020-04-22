import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromInstructor from '../store/index';
import { Subscription } from 'rxjs';
import { FilterServiceService } from '../shared-services/filter-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ExcelService } from './excel-service/excel.service';

@Component({
  selector: 'app-cadet-data-request',
  templateUrl: './cadet-data-request.component.html',
  styleUrls: ['./cadet-data-request.component.css']
})
export class CadetDataRequestComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromInstructor.State>, private filterService: FilterServiceService, private excelService: ExcelService) { }

  filteredData: any;
  unfilteredData: any;
  allSelected = true;
  subscription: Subscription = new Subscription();
  filterForm: FormGroup;

  ngOnInit() {
    this.filterForm = new FormGroup({
      letLevel: new FormControl('all'),
      period: new FormControl('all')
    });
    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if (data) {
          if (data.cadetData.cadetDataSheet) {
            const dataArray = Object.values(data.cadetData.cadetDataSheet);
            this.unfilteredData = dataArray;
            this.setData(dataArray);
          }
        }
      })
    );
  }

  setData(data) {
    const dataArray = data;
    dataArray.forEach((cadetData, index) => {
      dataArray[index].selected = 1;
    });
    this.filteredData = dataArray;
  }

  checked(i) {
    this.filteredData[i].selected = this.filteredData[i].selected === 1 ? 0 : 1;
  }

  checkTotal() {
    const setTo = this.allSelected ? 0 : 1;
    this.allSelected = !this.allSelected;
    this.filteredData.forEach((data, index) => {
      this.filteredData[index].selected = setTo;
    });
  }

  filter() {
    this.allSelected = true;
    const letLevel = this.filterForm.value.letLevel;
    const period = this.filterForm.value.period;
    this.setData(this.filterService.filter(letLevel, period, this.unfilteredData));
  }

  download() {
    const data = [];
    this.filteredData.forEach((element: any) => {
      if (element.selected === 1) {
         data.push({
           'Last Name (required)': element.lastName,
           'First Name (required)': element.firstName,
           'Middle Initial (optional)': '',
           'Birth Month (required)': element.birthMonth ? element.birthMonth : '' ,
           'Birth Year (required)': element.birthYear ? element.birthYear : '',
           'Gender (required)': element.gender ? element.gender : '',
           'Race (required)': element.race ? element.race : '',
           'Student Type (required)': element.studentType ? element.studentType : '',
           'Attending Different School (required)': element.differSchool ? element.differSchool : '',
           'ATTENDING DIFFERENT SCHOOL - School Name (required when Column I is marked "Y")': element.differSchoolName ? element.differSchoolName : '',
           'Class Period (required)': element.period ? element.period : '',
           'Grade (required)': element.grade ? element.grade : '',
           'LET (required)': element.letLevel ? element.letLevel : '',
           'Enrollment Date (dd-mmm-yyyy) (required)': element.enrollmentDate ? element.enrollmentDate.day + '-' + element.enrollmentDate.month + '-' + element.enrollmentDate.year : '',
           'Expected Graduation Month (required)': element.graduationMonth ? element.graduationMonth : '',
           'Expected Graduation Year (required)': element.graduationYear ? element.graduationYear : '',
           'Student ID (optional)': element.studentId ? element.studentId : ''
         });
      }
    });
    this.excelService.exportAsExcelFile(data, 'Cadet_Data_Sheet');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
