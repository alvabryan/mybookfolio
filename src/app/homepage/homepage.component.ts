import { Component, OnInit, HostListener, Inject } from '@angular/core';
import {trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 60) {
       const nav = document.getElementById('mainNav');
       nav.classList.add('navbar-shrink');
     } else if (window.pageYOffset < 60) {
      const nav = document.getElementById('mainNav');
      nav.classList.remove('navbar-shrink');
     }
  }


}


