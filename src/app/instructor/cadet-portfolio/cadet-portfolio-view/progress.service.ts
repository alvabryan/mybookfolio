import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }


  getProgress(letLevelNum, data) {
    const checkProgressFor = [
      'yearlyGoals',
      'winningColors',
      'successProfiler',
      'learningStyle',
      'personalAd',
      'humanGraphActivity',
      'resume',
      'financialPlanning',
      'courseWork',
      'essay',
      'lessonEvidence',
      'writtenSummary',
      'achievements',
      'cadetChallenge',
      'serviceLearning'
    ];

    const letLevel = `let${letLevelNum}`;

    const progress = {
      yearlyGoals: 0,
      winningColors: 0,
      successProfiler: 0,
      learningStyle: 0,
      personalAd: 0,
      humanGraphActivity: 0,
      resume: 0,
      financialPlanning: 0,
      courseWork: 0,
      essay: 0,
      lessonEvidence: 0,
      writtenSummary: 0,
      achievements: 0,
      cadetChallenge: 0,
      serviceLearning: 0
    };

    checkProgressFor.forEach((taskName) => {
      if (data[taskName]) {
        const searchData = data[taskName][letLevel];
        switch (taskName) {
          case 'successProfiler':
            progress[taskName] = searchData !== undefined ? 100 : 0;
            break;
          case 'resume':
            progress[taskName] = searchData > 100 ? 100 : searchData;
            break;
          default:
            progress[taskName] = searchData === undefined ? 0 : searchData;
        }
      } else {
        progress[taskName] = 0;
      }
    });



    return progress;
  }


  financialPlanningProgress(data, letLevel) {
    return 50;
  }
}
