import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-itme',
  templateUrl: './card-itme.component.html',
  styleUrls: ['./card-itme.component.css']
})
export class CardItmeComponent implements OnInit {
  @Input() card: {name: string, url: string, imageUrl: string, progress: string};

  constructor() { }

  ngOnInit() {
  }

}

