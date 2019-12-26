import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioViewService {

  constructor() { }

  checkCourseContent(title,progress){
    switch(title){
      case 'courseWork':
        return progress > 100 ? 100 : progress;
      break;
      case 'resume':
        return progress > 100 ? 100 : progress;
      break;
      case 'successProfiler':
        return progress > 100 ? 100 : progress;
      break;
      default:
        return progress;
    }
  }

  checkDataForProgress(index, dbTitle, data, letLevel){
    if(data[index].progress){
      if(data[index].progress[dbTitle]){
        if(data[index].progress[dbTitle][letLevel]){
          return this.checkCourseContent(dbTitle, data[index].progress[dbTitle][letLevel]);
        }else {
          return 0;
        }
      }else {
        return 0;
      }
    } else {
      return 0;
    }
  }


  getProgress(index, pageTitle, data) {
    const letLevel = 'let' + data[index].letLevel;
    switch (pageTitle) {
      case 'Four Year Goals':
        return this.checkDataForProgress(index, 'yearlyGoals', data, letLevel);
      break;
      case 'Winning colors':
          return this.checkDataForProgress(index, 'winningColors', data, letLevel);
      break;
      case 'Success Profiler and Personal Growth Plan':
          return this.checkDataForProgress(index, 'successProfiler', data, letLevel);
      break;
      case 'Learning Style Inventory':
          return this.checkDataForProgress(index, 'learningStyle', data, letLevel);
      break;
      case 'Personal Ad':
          return this.checkDataForProgress(index, 'personalAd', data, letLevel);
      break;
      case 'Human Graph Activity':
          return this.checkDataForProgress(index, 'humanGraph', data, letLevel);
      break;
      case 'Resume':
          return this.checkDataForProgress(index, 'resume', data, letLevel);
      break;
      case 'Financial Planning':
          return this.checkDataForProgress(index, 'financialPlanning1', data, letLevel);
      break;
      case 'Course Work':
          return this.checkDataForProgress(index, 'courseWork', data, letLevel);
      break;
      case 'Essay':
          return this.checkDataForProgress(index, 'essay', data, letLevel);
      break;
      case 'Let 1-4 Lesson Evidence':
          return this.checkDataForProgress(index, 'lessonEvidence', data, letLevel);
      break;
      case 'Written Summary':
          return this.checkDataForProgress(index, 'writtenSummary', data, letLevel);
      break;
      case 'Achievements':
          return this.checkDataForProgress(index, 'achievements', data, letLevel);
      break;
      case 'Cadet Challenge':
          return this.checkDataForProgress(index, 'cadetChallenge', data, letLevel);
      break;
      case 'Service Learning':
          return this.checkDataForProgress(index, 'serviceLearning', data, letLevel);
      break;
      default:
          return 0;
    }
  }
}
