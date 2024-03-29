import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardProgressService {

  constructor() { }

  determineCadetProgress(cadetProgress, cadetLetLevel) {
    const dbProgress = cadetProgress;
    const letLevel = 'let' + cadetLetLevel;
    // tslint:disable-next-line: prefer-const

    const newCadetProgress = {};

    const cardPaths = [
      'successProfiler',
      'resume',
      'courseWork',
      'essay',
      'achievements',
      'serviceLearning',
      'lessonEvidence',
      'writtenSummary',
      'cadetChallenge',
      'learningStyle',
      'yearlyGoals',
      'personalAd',
      'winningColors',
      'humanGraphActivity',
      'financialPlanningModule1',
      'financialPlanningModule2',
      'financialPlanningModule3',
      'financialPlanningModule4',
      'financialPlanningModule5',
      'financialPlanningModule6'
    ];

    for (const x of cardPaths) {
      if (dbProgress[x]) {
        if (dbProgress[x][letLevel]) {
          newCadetProgress[x] = `${dbProgress[x][letLevel]}%`;
        } else {
          newCadetProgress[x] = `0%`;
        }
      } else {
        newCadetProgress[x] = `0%`;
      }
    }

    return newCadetProgress;
  }
}
