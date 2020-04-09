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
      'courseWork',
      'essay',
      'lessonEvidence',
      'writtenSummary',
      'achievements',
      'cadetChallenge',
      'serviceLearning',
      'financialPlanningModule1',
      'financialPlanningModule2',
      'financialPlanningModule3',
      'financialPlanningModule4',
      'financialPlanningModule5',
      'financialPlanningModule6'
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
      courseWork: 0,
      essay: 0,
      lessonEvidence: 0,
      writtenSummary: 0,
      achievements: 0,
      cadetChallenge: 0,
      serviceLearning: 0,
      financialPlanningModule1: 0,
      financialPlanningModule2: 0,
      financialPlanningModule3: 0,
      financialPlanningModule4: 0,
      financialPlanningModule5: 0,
      financialPlanningModule6: 0
    };

    checkProgressFor.forEach((taskName) => {
      if (data[taskName]) {
        const searchData = data[taskName][letLevel];
        progress[taskName] = searchData ? searchData : 0;
        // switch (taskName) {
        //   case 'successProfiler':
        //     progress[taskName] = searchData !== 0 || searchData !== '' ? 100 : 0;
        //     break;
        //   case 'resume':
        //     progress[taskName] = searchData > 100 ? 100 : searchData;
        //     break;
        //   default:
        //     progress[taskName] = searchData === 0 || searchData !== '' ? 0 : searchData;
        // }
      } else {
        progress[taskName] = 0;
      }
    });



    return progress;
  }
}
