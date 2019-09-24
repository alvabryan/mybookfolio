import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-learning-style',
  templateUrl: './learning-style.component.html',
  styleUrls: ['./learning-style.component.css']
})
export class LearningStyleComponent implements OnInit {

  learningStyle: FormGroup;

  constructor() { }

  ngOnInit() {
    this.learningStyle = new FormGroup({
      environmentalP1: new FormGroup({
        environmentalP1Q1: new FormControl(''),
        environmentalP1Q2: new FormControl(''),
        environmentalP1Q3: new FormControl(''),
        environmentalP1Q4: new FormControl(''),
        environmentalP1Q5: new FormControl(''),
        environmentalP1Q6: new FormControl(''),
        environmentalP1Q7: new FormControl('')
      }),
      emotionalP1: new FormGroup({
        emotionalP1Q1: new FormControl(''),
        emotionalP1Q2: new FormControl(''),
        emotionalP1Q3: new FormControl(''),
        emotionalP1Q4: new FormControl(''),
        emotionalP1Q5: new FormControl(''),
        emotionalP1Q6: new FormControl(''),
        emotionalP1Q7: new FormControl('')
      }),
      sociologicalP1: new FormGroup({
        sociologicalP1Q1: new FormControl(''),
        sociologicalP1Q2: new FormControl(''),
        sociologicalP1Q3: new FormControl(''),
        sociologicalP1Q4: new FormControl(''),
        sociologicalP1Q5: new FormControl(''),
        sociologicalP1Q6: new FormControl(''),
        sociologicalP1Q7: new FormControl('')
      }),
      physicalP1: new FormGroup({
        physicalP1Q1: new FormControl(''),
        physicalP1Q2: new FormControl(''),
        physicalP1Q3: new FormControl(''),
        physicalP1Q4: new FormControl(''),
        physicalP1Q5: new FormControl(''),
        physicalP1Q6: new FormControl(''),
        physicalP1Q7: new FormControl(''),
        physicalP1Q8: new FormControl(''),
        physicalP1Q9: new FormControl(''),
        physicalP1Q10: new FormControl(''),
        physicalP1Q11: new FormControl('')
      }),
      psychologicalP1: new FormGroup({
        psychologicalP1Q1: new FormControl(''),
        psychologicalP1Q2: new FormControl(''),
        psychologicalP1Q3: new FormControl(''),
        psychologicalP1Q4: new FormControl(''),
        psychologicalP1Q5: new FormControl(''),
        psychologicalP1Q6: new FormControl(''),
        psychologicalP1Q7: new FormControl('')
      }),
      environmentalP2: new FormGroup({
        environmentalP2Q1: new FormControl(''),
        environmentalP2Q2: new FormControl(''),
        environmentalP2Q3: new FormControl(''),
        environmentalP2Q4: new FormControl(''),
        environmentalP2Q5: new FormControl(''),
        environmentalP2Q6: new FormControl(''),
        environmentalP2Q7: new FormControl('')
      }),
      emotionalP2: new FormGroup({
        emotionalP2Q1: new FormControl(''),
        emotionalP2Q2: new FormControl(''),
        emotionalP2Q3: new FormControl(''),
        emotionalP2Q4: new FormControl('')
      }),
      sociologicalP2: new FormGroup({
        sociologicalP2Q1: new FormControl(''),
        sociologicalP2Q2: new FormControl(''),
        sociologicalP2Q3: new FormControl(''),
        sociologicalP2Q4: new FormControl(''),
        sociologicalP2Q5: new FormControl(''),
        sociologicalP2Q6: new FormControl(''),
      }),
      physicalP2: new FormGroup({
        physicalP2Q1: new FormControl(''),
        physicalP2Q2: new FormControl(''),
        physicalP2Q3: new FormControl(''),
        physicalP2Q4: new FormControl(''),
        physicalP2Q5: new FormControl(''),
        physicalP2Q6: new FormControl('')
      })
    });
  }


  submit(data) { 
    console.log(this.learningStyle.value);
  }

}
