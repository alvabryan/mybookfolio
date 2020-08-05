import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-cards',
  templateUrl: './custom-cards.component.html',
  styleUrls: ['./custom-cards.component.css']
})
export class CustomCardsComponent implements OnInit {

  portfolioCustomCards = [
    {
      name: 'Custom Cards', cards: [
        {name: 'cEssay', url: 'custom-card-essay', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/essay.png'},
        {name: 'cSyllabus', url: 'custom-card-essay', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/essay.png'},
        {name: 'cCadet Agreement', url: 'custom-card-essay', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/essay.png'},
        {name: 'cPrivacy Policy', url: 'custom-card-essay', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/essay.png'}
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
