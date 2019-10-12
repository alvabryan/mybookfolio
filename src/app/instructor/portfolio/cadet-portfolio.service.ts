import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadetPortfolioService {

  cadetData = new BehaviorSubject<{
    uid: string,
    firstName: string,
    lastName: string,
    letLevel: string,
    hasData: boolean
  }>({uid: '', firstName: '', lastName: '', letLevel: '', hasData: false});

  constructor() { }
}
