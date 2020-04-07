import { Injectable } from '@angular/core';

interface ProgressState {
  successProfiler: number;
  resume: number;
  courseWork: number;
  essay: number;
  achievements: number;
  serviceLearning: number;
  lessonEvidence: number;
  writtenSummary: number;
  cadetChallenge: number;
  learningStyle: number;
  yearlyGoals: number;
  personalAd: number;
  winningColors: number;
  humanGraphActivity: number;
  financialPlanningModule1: number;
  financialPlanningModule2: number;
  financialPlanningModule3: number;
  financialPlanningModule4: number;
  financialPlanningModule5: number;
  financialPlanningModule6: number;
}

@Injectable({
  providedIn: 'root'
})
export class CardProgressService {

  constructor() { }

  determineCadetProgress(letAssinged, cadetProgress) {

    const newCadetProgessRoster = [];

    Object.values(cadetProgress).forEach((cadetData: any) => {
      const currentCadetData = cadetData;

      if (letAssinged.includes(cadetData.letLevel)) {
        if (!currentCadetData.progress) {
          currentCadetData.progress = {};
        }
        newCadetProgessRoster.push(currentCadetData);
      }
    });

    const progressLength = newCadetProgessRoster.length;
    const progress: ProgressState = {
      successProfiler: 0,
      resume: 0,
      courseWork: 0,
      essay: 0,
      achievements: 0,
      serviceLearning: 0,
      lessonEvidence: 0,
      writtenSummary: 0,
      cadetChallenge: 0,
      learningStyle: 0,
      yearlyGoals: 0,
      personalAd: 0,
      winningColors: 0,
      humanGraphActivity: 0,
      financialPlanningModule1: 0,
      financialPlanningModule2: 0,
      financialPlanningModule3: 0,
      financialPlanningModule4: 0,
      financialPlanningModule5: 0,
      financialPlanningModule6: 0
    };

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
      'serviceLearning',
      'achievements',
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

    newCadetProgessRoster.forEach((currentData) => {

      const searchProgress = currentData.progress;
      const searchLet = 'let' + currentData.letLevel;

      for (const x of cardPaths) {
        if (!searchProgress[x] || searchProgress[x] === undefined) {
          progress[x] += 0;
        } else {
          if (searchProgress[x][searchLet]) {
            progress[x] += searchProgress[x][searchLet];
          } else {
            progress[x] += 0;
          }
        }
      }

    });

    const progressKeys = Object.keys(progress);
    const progressValues = Object.values(progress);
    progressValues.forEach((data, index) => {
      const newScore = data / progressLength;
      progress[progressKeys[index]] = Math.round(newScore);
    });

    return progress;
  }

}
