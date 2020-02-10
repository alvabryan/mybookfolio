import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
        // tslint:disable-next-line: max-line-length
        {name: 'Four Year Goals', url: 'four-year-goals', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/goal.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Winning Colors', url: 'winning-colors', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/paper.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Success Profiler and Personal Growth Plan', url: 'course-work_successProfiler', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/successPro.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Learning Style Inventory', url: 'learning-style', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/learningStyle.png', progress: '100%'}
      ]
    },
    {
      name: 'Cadet Success', cards:
      [
        {name: 'Personal Ad', url: 'personal-ad', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/pen.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Human Graph Activity', url: 'human-graph', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/graphActivity.png', progress: '100%'},
        {name: 'Resume', url: 'course-work_resume', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/resume.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Financial Planning', url: 'financial-planning', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/bank.png', progress: '100%'}
      ]
    },
    {
      name: 'Course Work', cards:
      [
        // tslint:disable-next-line: max-line-length
        {name: 'Course Work', url: 'course-work_courseWork', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/courseWork.png', progress: '100%'},
        {name: 'Essay', url: 'essay', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/essay.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Let 1-4 Lesson Evidence', url: 'course-work_lessonEvidence', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/books.png', progress: '100%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Written Summary', url: 'course-work_writtenSummary', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/edit.png', progress: '100%'}
      ]
    },
    {
      name: 'Awards', cards:
      [
        // tslint:disable-next-line: max-line-length
        {name: 'Achievements', url: 'course-work_achievements', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/medal.png', progress: '100px'},
        // tslint:disable-next-line: max-line-length
        {name: 'Cadet Challenge', url: 'portfolio-cadet-challenge', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/running-man.png', progress: '100px'},
        // tslint:disable-next-line: max-line-length
        {name: 'Service Learning', url: 'course-work_serviceLearning', imageUrl: 'https://www.mybookfolio.com/cadets/imagesCards/serviceLearning.png', progress: '100px'}
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
