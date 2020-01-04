import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor() { }


  filterByLetAssign() {

  }


  filter(letLevel, period, battalionData) {
    const filterRoster: Array<any> = [];

    battalionData.forEach((data) => {
      // tslint:disable-next-line: triple-equals
      if (letLevel == 'all' && period == 'all') {
        filterRoster.push(data);
      // tslint:disable-next-line: triple-equals
      } else if (letLevel !== 'all' && period == 'all') {
        // tslint:disable-next-line: triple-equals
        if ( data.letLevel == letLevel) {
          filterRoster.push(data);
        }
      // tslint:disable-next-line: triple-equals
      } else if (letLevel == 'all' && period !== 'all') {
        // tslint:disable-next-line: triple-equals
        if ( data.period == period) {
          filterRoster.push(data);
        }
      } else if (letLevel !== 'all' && period !== 'all' ) {
        // tslint:disable-next-line: triple-equals
        if ( data.period == period && data.letLevel == letLevel) {
          filterRoster.push(data);
        }
      }
    });
    return filterRoster;
  }
}
