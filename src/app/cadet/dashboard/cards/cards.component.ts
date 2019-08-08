import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  portfolioContet = [
    {
      name: 'Personal Growth', cards:
      [
        {name: 'Four Year Goals', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/goal.png', progress: '100%'},
        {name: 'Winning colors', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/paper.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Success Profiler and Personal Growth Plan', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/successPro.png', progress: '100%'},
        {name: 'Learning Style Inventory', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/learningStyle.png', progress: '100%'}
      ]
    },
    {
      name: 'Cadet Success', cards:
      [
        {name: 'Personal Ad', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/pen.png', progress: '100%'},
        {name: 'Human Graph Activity', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/graphActivity.png', progress: '100%'},
        {name: 'Resume', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/resume.png', progress: '100%'},
        {name: 'Financial Planning', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/bank.png', progress: '100%'}
      ]
    },
    {
      name: 'Course Work', cards:
      [
        {name: 'Course Work', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/courseWork.png', progress: '100%'},
        {name: 'Essay', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/essay.png', progress: '100%'},
        {name: 'Let 1-4 Lesson Evidence', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/books.png', progress: '100%'},
        {name: 'Written Summary', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/edit.png', progress: '100%'}
      ]
    },
    {
      name: 'Awards', cards:
      [
        {name: 'Achievements', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/medal.png', progress: '100px'},
        {name: 'Cadet Challenge', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/running-man.png', progress: '100px'},
        {name: 'Service Learning', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/serviceLearning.png', progress: '100px'}
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
