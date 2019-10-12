import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }


  getProgress(letLevelNum, data) {

    let checkProgressFor = [
      'yearlyGoals',
      'winningColors',
      'successProfiler',
      'learningStyle',
      'personalAd',
      'humanGraph',
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

    let letLevel = `let${letLevelNum}`;

    let progress = {
      yearlyGoals: 0,
      winningColors: 0,
      successProfiler: 0,
      learningStyle: 0,
      personalAd: 0,
      humanGraph: 0,
      resume: 0,
      financialPlanning: 0,
      courseWork: 0,
      essay: 0,
      lessonEvidence: 0,
      writtenSummary: 0,
      achievements: 0,
      cadetChallenge: 0,
      serviceLearning: 0
    }

    checkProgressFor.forEach((taskName)=>{
      if(data[taskName]){
        progress[taskName] = data[taskName][letLevel] === undefined ? 0 : data[taskName][letLevel];
      } else {
        progress[taskName] = 0;
      }
    })



    return progress;
  }


  financialPlanningProgress(data, letLevel) {
    return 50;
  }
}