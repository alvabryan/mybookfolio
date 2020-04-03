import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProgressService {

  constructor() { }

  fpOneFields = ['habitOne', 'habitOneSymbol', 'habitOneDesc', 'habitTwo', 'habitTwoSymbol', 'habitTwoDesc', 'habitThree', 'habitThreeSymbol', 'habitThreeDesc',
    'monthTotal', 'yearTotal', 'spentOne', 'spentTwo', 'boughtQuestion', 'reasonWaitOne', 'needWantOne', 'needWantTwo', 'itemThree', 'needWantThree', 'itemFour', 'needWantFour',
    'itemFive', 'needWantFive', 'itemSix', 'needWantSix', 'itemSeven', 'needWantSeven', 'valueOne', 'whyOne', 'valueTwo', 'whyTwo', 'valueThree', 'whyThree', 'smartOne', 'smartTwo',
    'smartThree', 'smartFour', 'smartFive', 'smartSix', 'goalOne', 'goalTwo', 'incomeOne', 'differOne', 'differTwo', 'myIncome', 'questionOne', 'questionTwo', 'questionThree', 'questionFour'];

  fpTwoFields = ['ynOne', 'ynTwo', 'ynThree', 'ynFour', 'ynFive', 'ynSix', 'ynSeven', 'ynEight', 'rOne', 'rTwo', 'rThree', 'tOne', 'tTwo', 'tThree', 'tFour',
    'iOne', 'iTwo', 'iThree', 'tableOneQ', 'tableTwoQ', 'tableThreeQ', 'tableFourQ', 'tableFiveQ', 'tableSixQ', 'tableSevenQ', 'twoBone', 'twoCone'];

  fpThreeFields = ['actOne', 'actTwo', 'actThree', 'intOne', 'checkOne', 'checkTwo', 'myOne', 'myTwo', 'myThree', 'myFour', 'myFive', 'mySix', 'whatOne',
    'whatTwo', 'whatThree', 'whatFour', 'whatFive', 'whatSix', 'getOne', 'getTwo', 'getThree', 'getFour', 'getFive', 'theOne', 'theTwo',
    'workOne', 'workTwo', 'adOne', 'adTwo', 'adThree'];

  fpFourFields = ['wealthyOne', 'moneyOne', 'moneyTwo', 'differenceOne', 'watchOne', 'watchTwo', 'watchThree', 'watchFour', 'watchFive', 'watchSix',
    'riskOne', 'toolOne', 'toolTwo', 'toolThree', 'toolFour', 'toolFive'];

  fpFiveFields = ['proofOne', 'proofTwo', 'offerOne', 'offerTwo', 'offerThree'];

  fpSixFields = ['riskOne', 'riskTwo', 'riskThree', 'riskFour', 'riskFive', 'riskSix', 'lessonOne', 'lessonTwo', 'lessonThree',
    'lessonFour', 'lessonFive', 'lessonSix', 'lessonSeven', 'lessonEight', 'monthOne'];

  getFinancialPlanningProgress(data: any, moduleName: string) {
    let fieldsToGrade: Array<any>;

    switch (moduleName) {
      case 'Financial Planning Module 1':
        fieldsToGrade = this.fpOneFields;
        break;
      case 'Financial Planning Module 2':
        fieldsToGrade = this.fpTwoFields;
        break;
      case 'Financial Planning Module 3':
        fieldsToGrade = this.fpThreeFields;
        break;
      case 'Financial Planning Module 4':
        fieldsToGrade = this.fpFourFields;
        break;
      case 'Financial Planning Module 5':
        fieldsToGrade = this.fpFiveFields;
        break;
      case 'Financial Planning Module 6':
        fieldsToGrade = this.fpSixFields;
        break;
      default:
        fieldsToGrade = [];
    }

    const fieldsLength = (fieldsToGrade.length);
    const multiplier = 100 / fieldsLength;
    let progress = 0;

    fieldsToGrade.forEach((fieldName) => {
      if (data[fieldName] !== '') {
        progress += 1;
      }
    });

    progress *= multiplier;
    return Math.floor(progress);

  }
}
