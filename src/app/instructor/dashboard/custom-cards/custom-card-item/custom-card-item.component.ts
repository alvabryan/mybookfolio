import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-card-item',
  templateUrl: './custom-card-item.component.html',
  styleUrls: ['./custom-card-item.component.css']
})
export class CustomCardItemComponent implements OnInit {
  @Input() card: {name: string, url: string, imageUrl: string, progress: string};
  @Output() urlData = new EventEmitter<{name: string, url: string}>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routePage() {
    this.router.navigate(['/instructor/portfolio-view'], {queryParams: {name: this.card.name, url: this.card.url}});
  }

}
