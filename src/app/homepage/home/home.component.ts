import { Component, OnInit, HostListener, Inject, AfterViewChecked, OnDestroy  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgwWowService } from 'ngx-wow';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked, OnDestroy {
  // fragment variable
  fragment: any;
  subscription: Subscription;

  constructor(@Inject(DOCUMENT) document, private route: ActivatedRoute, private wowService: NgwWowService) {
    this.wowService.init();
  }

  ngOnInit() {
    this.subscription = this.route.fragment.subscribe(fragment => {
      this.fragment = fragment ? fragment : null;
    });

    const preloader = $('#loader-wrapper');
    const loader = preloader.find('.cssload-contain');
    loader.fadeOut();
    preloader.delay(400).fadeOut('slow');
  }

  ngAfterViewChecked(): void {
    try {
      if (this.fragment) {
          document.querySelector('#' + this.fragment).scrollIntoView();
          this.fragment = null;
      } else {
        this.fragment = null;
      }
    } catch (e) { }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(e) {
  //    if (window.pageYOffset > 60) {
  //      const nav = document.getElementById('mainNav');
  //      nav.classList.add('navbar-shrink');
  //    } else if (window.pageYOffset < 60) {
  //     const nav = document.getElementById('mainNav');
  //     nav.classList.remove('navbar-shrink');
  //    }
  // }

}
