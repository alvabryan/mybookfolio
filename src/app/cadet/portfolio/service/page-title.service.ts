import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor() {}

  // sets the page title for the portfolio
  pageTitle = new Subject<string>();



}
