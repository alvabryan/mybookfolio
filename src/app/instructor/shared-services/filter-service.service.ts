import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor() { }


  filter(letLevel,period,battalionData) {
    let filterRoster: Array<any> = [];

    battalionData.forEach((data)=>{
      if(letLevel == 'all' && period == 'all') {
        filterRoster.push(data);
      } else if (letLevel != 'all' && period == 'all') {
        if( data.letLevel == letLevel) {
          filterRoster.push(data);
        }
      } else if (letLevel == 'all' && period != 'all') {
        if( data.period == period) {
          filterRoster.push(data);
        }
      } else if (letLevel != 'all' && period != 'all' ) {
        if( data.period == period && data.letLevel == letLevel) {
          filterRoster.push(data);
        }
      }
    })

    return filterRoster;
  }
}
